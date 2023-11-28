import { AppDataSource } from "../../dataSource";
import Clinic from "../entity/clinic";
import ReservationDetail from "../entity/reservationDetail";
import { CardCodeWithNumber, CardCodeWithoutNumber, CaseType, MedicalType, Status } from "../utils/enum";
import { MyError } from "../utils/errorMessage";
import { removeUndefined } from "../utils/orm";

interface RegisterOption {
  reservationDetailId: number;
  date: string;
  isNhi: boolean;
  hasIcCard?: boolean;
  cardExceptionCode?: CardCodeWithNumber | CardCodeWithoutNumber;
  medicalType?: MedicalType;
  medicalNumber?: string;
  caseType?: CaseType;
  patientId: number;
  payableAmount: number;
  paidAmount?: number;
}

interface PaidOption {
  isNhi?: boolean;
  hasIcCard?: boolean;
  cardExceptionCode?: CardCodeWithNumber | CardCodeWithoutNumber;
  medicalType?: MedicalType;
  medicalNumber?: string;
  caseType?: CaseType;
  payableAmount?: number;
  paidAmount?: number;
}

export default class ClinicController {
  /**
   * 掛號
   * @param option 
   * @returns 
   */
  public static async register(option: RegisterOption) {
    const {
      reservationDetailId, date, isNhi, hasIcCard, cardExceptionCode,
      medicalType, medicalNumber, caseType, patientId, payableAmount, paidAmount,
    } = option;

    const reservationDetail = await AppDataSource.getRepository(ReservationDetail)
      .createQueryBuilder('reservationDetail')
      .leftJoinAndSelect('reservationDetail.reservationOverview', 'reservationOverview')
      .where('reservationDetail.id=:id', { id: reservationDetailId })
      .getOne();

    if (!reservationDetail) {
      throw new MyError(MyError.INVALID_PARAMETER, `reservationDetail ${reservationDetailId} does not exist`);
    }

    // 如果已有預約且不是該病患
    if (reservationDetail.patientId && reservationDetail.patientId !== patientId) {
      throw new MyError(MyError.COLUMN_MISMATCH, `reservationDetail ${reservationDetailId} has been reserved by patient ${reservationDetail.patientId}`);
    }

    if (isNhi && !medicalType) {

      throw new MyError(MyError.INSUFFICIENT_DATA, 'Should provide medicalType for nhi register');
    }

    return await AppDataSource.createQueryBuilder()
      .insert()
      .into(Clinic)
      .values({
        reservationDetailId,
        date,
        isNhi,
        hasIcCard: hasIcCard ?? false,
        cardExceptionCode,
        medicalType,
        medicalNumber,
        caseType,
        doctorId: reservationDetail.reservationOverview.doctorId,
        patientId,
        status: Status.REGISTER,
        payableAmount,
        paidAmount: paidAmount ?? 0,
        soap: ''
      })
      .execute();
  }

  /**
   * 由id取得門診
   * @param clinicId 
   * @returns 
   */
  public static async getClinic(clinicId: number) {
    const clinic = await AppDataSource.getRepository(Clinic)
      .createQueryBuilder('clinic')
      .where('clinic.id=:id', { id: clinicId })
      .getOne();

    if (!clinic) {
      throw new MyError(MyError.INVALID_PARAMETER, `clinic ${clinicId} does not exist`);
    }

    return clinic;
  }

  /**
   * 開始看診或重新看診
   * @param clinicId 
   * @returns 
   */
  public static async start(clinicId: number) {
    // valid clinicId
    const clinic = await this.getClinic(clinicId);
    if (clinic.status === Status.CLINIC) return;

    // 已退掛則不能重新看診
    if (clinic.status === Status.UNREGISTER) {
      throw new MyError(MyError.INVALID_STATUS_CLINIC, 'clinic already unregister');
    }

    return await AppDataSource.getRepository(Clinic)
      .createQueryBuilder('clinic')
      .update()
      .set({ status: Status.CLINIC, beginTime: new Date() })
      .where('clinic.id=:id', { id: clinicId })
      .execute();
  }


  /**
   * 更新主訴與觀察
   * @param clinicId 
   * @param soap 
   * @returns 
   */
  public static async updateSoap(clinicId: number, soap: string) {
    // valid clinicId
    await this.getClinic(clinicId);

    return await AppDataSource.getRepository(Clinic)
      .createQueryBuilder('clinic')
      .update()
      .set({ soap })
      .where('clinic.id=:id', { id: clinicId })
      .execute();
  }

  /**
   * 完診
   * @param clinicId 
   * @returns 
   */
  public static async finish(clinicId: number) {
    // valid clinicId
    const clinic = await this.getClinic(clinicId);

    if (clinic.status !== Status.CLINIC) {
      throw new MyError(MyError.INVALID_STATUS_CLINIC, 'clinic not start');
    }

    return await AppDataSource.getRepository(Clinic)
      .createQueryBuilder('clinic')
      .update()
      .set({ status: Status.COMPLETE, finishTime: new Date() })
      .where('clinic.id=:id', { id: clinicId })
      .execute();
  }

  /**
   * 批價繳費
   * @param clinicId 
   * @param option 
   * @returns 
   */
  public static async paid(clinicId: number, option: PaidOption) {
    const {
      isNhi, hasIcCard, cardExceptionCode, medicalType, medicalNumber, caseType,
      payableAmount, paidAmount,
    } = option;

    // valid clinicId
    const clinic = await this.getClinic(clinicId);

    if (clinic.status !== Status.COMPLETE) {
      throw new MyError(MyError.INVALID_STATUS_CLINIC, 'clinic not complete');
    }

    // 如果最終選擇健保, 或最初就選健保且不更改
    if (isNhi || (isNhi === undefined && clinic.isNhi)) {
      if (!medicalType && !clinic.medicalType) {
        throw new MyError(MyError.INSUFFICIENT_DATA, 'Should provide medicalType for nhi');
      }

      if (!caseType && !clinic.caseType) {
        throw new MyError(MyError.INSUFFICIENT_DATA, 'Should provide caseType for nhi');
      }
    }

    const finalPaidAmount = (clinic.paidAmount ?? 0) + (paidAmount ?? 0);
    const updateData = removeUndefined(
      {
        isNhi, hasIcCard, cardExceptionCode, medicalType, medicalNumber, caseType,
        payableAmount, paidAmount: finalPaidAmount, status: Status.PAID,
      }
    );

    return await AppDataSource.getRepository(Clinic)
      .createQueryBuilder('clinic')
      .update()
      .set(updateData)
      .where('clinic.id=:id', { id: clinicId })
      .execute();
  }

  /**
   * 退掛
   * @param clinicId 
   * @returns 
   */
  public static async unregister(clinicId: number) {
    // valid clinicId
    const clinic = await this.getClinic(clinicId);

    if (clinic.status === Status.PAID) {
      throw new MyError(MyError.INVALID_STATUS_CLINIC, 'clinic already paid');
    }

    return await AppDataSource.getRepository(Clinic)
      .createQueryBuilder('clinic')
      .update()
      .set({ status: Status.UNREGISTER })
      .where('clinic.id=:id', { id: clinicId })
      .execute();
  }

  /**
   * 取得指定病人指定區間所有門診, 並顯示是否有欠款
   * @param patientId 
   * @param startDate 
   * @param endDate 
   * @returns 
   */
  public static async getClinicByPatient(patientId: number, startDate?: string, endDate?: string) {
    const queryBuilder = AppDataSource.getRepository(Clinic)
    .createQueryBuilder('clinic')
    .where('clinic.patientId=:patientId', { patientId })

    if (startDate && endDate) {
      queryBuilder.andWhere('clinic.date BETWEEN :startDate AND :endDate', { startDate, endDate })
    }

    const clinics = await queryBuilder.getMany();

    return clinics.map(clinic => {return { ...clinic, hasArrears: clinic.payableAmount > clinic.paidAmount }})
  }

}