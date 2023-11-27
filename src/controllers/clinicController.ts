import { AppDataSource } from "../../dataSource";
import Clinic from "../entity/clinic";
import ReservationDetail from "../entity/reservationDetail";
import { CardCodeWithNumber, CardCodeWithoutNumber, CaseType, MedicalType, Status } from "../utils/enum";

interface RegisterOption {
  reservationDetailId: number;
  date: string;
  isNhi: boolean;
  hasIcCard?: boolean;
  cardExceptionCode?: CardCodeWithNumber | CardCodeWithoutNumber;
  medicalType?: MedicalType;
  medicalNumber?: string;
  caseType: CaseType;
  patientId: number;
  payableAmount: number;
  paidAmount: number;

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
      throw new Error(`reservationDetail ${reservationDetailId} does not exist`);
    }

    // 如果已有預約且不是該病患
    if (reservationDetail.patientId && reservationDetail.patientId !== patientId) {
      throw new Error(`reservationDetail ${reservationDetailId} has been reserved by patient ${reservationDetail.patientId}`);
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
        paidAmount,
      })
      .execute();
  }

}