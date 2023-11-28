import moment from "moment";
import { AppDataSource } from "../../dataSource";
import ReservationDetail from "../entity/reservationDetail";
import ReservationOverview from "../entity/reservationOverview";
import { Division, ReservationFrom, ReservationType, TimeSlot } from "../utils/enum";
import PatientController from "./patientController";
import { MyError } from "../utils/errorMessage";

interface CreateReservationListOption {
  date: string;
  timeSlot: TimeSlot;
  division: Division;
  doctorId: string;
  canReverse?: boolean;
  totalNo?: number;
  types?: ReservationType[];
}

interface ReservationOption {
  reservationDetailId: number;
  patientId: number;
  note?: string;
  from: ReservationFrom;
}

export default class ReservationController {
  /**
   * 新增一張預約班表
   * @param option 
   * @returns 
   */
  public static async createReservationList(option: CreateReservationListOption) {
    const {
      date, timeSlot, division, doctorId, canReverse = true,
      totalNo = 50, types // 預設一個預約班表開50號
    } = option;

    const reservationOverviewBefore = await AppDataSource.getRepository(ReservationOverview)
      .createQueryBuilder('reservationOverview')
      .where('reservationOverview.date=:date', { date })
      .andWhere('reservationOverview.timeSlot=:timeSlot', { timeSlot })
      .andWhere('reservationOverview.doctorId=:doctorId', { doctorId })
      .getOne();

    // 已有同天同時段同醫師則不能新增
    if (reservationOverviewBefore) {
      throw new MyError(MyError.INVALID_PARAMETER, `reservationOverview ${date}, ${timeSlot}, ${doctorId} exists`);
    }

    const reservationOverview = await AppDataSource.createQueryBuilder()
      .insert()
      .into(ReservationOverview)
      .values({ date, timeSlot, division, doctorId, canReverse: canReverse ?? true })
      .execute();

    // 預設給號類別, 不能預約為現場號, 能預約則為預約號
    const defaultType = !canReverse ? ReservationType.ON_SITE : ReservationType.RESERVE;
    const reservationDetails = [];
    for (let i = 0; i < totalNo; i++) {
      reservationDetails.push({
        reservationOverviewId: reservationOverview.generatedMaps[0].id,
        no: i + 1,
        type: (types?.length ?? 0) >= i + 1 // 提供的給號類別不足時以defaultType加入
          ? (!canReverse && types[i] === ReservationType.RESERVE ? ReservationType.ON_SITE : types[i]) // 如果不能預約卻有預約號, 則改為現場號
          : defaultType,
      })
    }

    return await AppDataSource.createQueryBuilder()
      .insert()
      .into(ReservationDetail)
      .values(reservationDetails)
      .execute();
  }

  /**
   * 預約門診
   * @param option 
   * @returns 
   */
  public static async reservation(option: ReservationOption) {
    const { reservationDetailId, patientId, note, from } = option;

    // valid patientId
    await PatientController.getPatientById(patientId);

    const reservationDetail = await AppDataSource.getRepository(ReservationDetail)
      .createQueryBuilder('reservationDetail')
      .leftJoinAndSelect('reservationDetail.reservationOverview', 'reservationOverview')
      .where('reservationDetail.id=:id', { id: reservationDetailId })
      .getOne();

    if (!reservationDetail) {
      throw new MyError(MyError.INVALID_PARAMETER, `Invalid reservationDetailId ${reservationDetailId}`);
    }

    // 預約總表設定不能預約
    if (reservationDetail.reservationOverview.canReverse === false) {
      throw new MyError(MyError.INVALID_TYPE_RESERVATION, `reservationOverview ${reservationDetail.reservationOverviewId} can not be reserved`);
    }

    // 不給號
    if (reservationDetail.type === ReservationType.NOT) {
      throw new MyError(MyError.INVALID_TYPE_RESERVATION, `reservationDetail ${reservationDetailId} is type not`);
    }

    // 現場號但是從網路預約
    if (reservationDetail.type === ReservationType.ON_SITE && from === ReservationFrom.NET) {
      throw new MyError(MyError.INVALID_TYPE_RESERVATION, `reservationDetail ${reservationDetailId} can only be reserved on site`);
    }

    return await AppDataSource.getRepository(ReservationDetail)
      .createQueryBuilder('reservationDetail')
      .update()
      .set({ reverseTime: new Date, patientId, note })
      .where('reservationDetail.id=:id', { id: reservationDetailId })
      .execute();
  }

  /**
   * 取得指定月分所有預約班表
   * @param year 
   * @param month 
   * @returns 
   */
  public static async getReservation(year: number, month: number) {
    const startOfMonth = moment(`${year}-${month}-01`).startOf('month').format('YYYY-MM-DD');
    const endOfMonth = moment(`${year}-${month}-01`).endOf('month').format('YYYY-MM-DD');

    return await AppDataSource.getRepository(ReservationOverview)
      .createQueryBuilder('reservationOverview')
      .leftJoinAndSelect('reservationOverview.reservationDetails', 'reservationDetail')
      .where('reservationOverview.date BETWEEN :startOfMonth AND :endOfMonth', { startOfMonth, endOfMonth })
      .getMany();
  }

  /**
   * 修改預約給號類別
   * @param reservationDetailId 
   * @param type 
   * @returns 
   */
  public static async updateReservationType(reservationDetailId: number, type: ReservationType) {
    return await AppDataSource.getRepository(ReservationDetail)
      .createQueryBuilder('reservationDetail')
      .update()
      .set({ type })
      .where('reservationDetail.id=:id', { id: reservationDetailId })
      .execute();
  }

}