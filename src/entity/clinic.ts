import { Column, Entity, Generated, JoinColumn, OneToOne } from "typeorm";
import { CardCode, CardCodeWithNumber, CardCodeWithoutNumber, CaseType, MedicalType, Status } from "../utils/enum";
import ReservationDetail from "./reservationDetail";

@Entity('clinic')
export default class Clinic {
  @Column("bigint", { primary: true, comment: "流水號", })
  @Generated('increment')
  id!: number;

  @Column({ type: "varchar", comment: '預約細項id', length: 100 })
  reservationDetailId!: string;

  @Column({ type: "varchar", comment: '門診日期, YYYY-MM-DD', length: 20 })
  date!: string;

  @Column({ type: 'datetime', nullable: true, comment: '開始看診時間' })
  beginTime?: Date;

  @Column({ type: 'datetime', nullable: true, comment: '完診時間' })
  finishTime?: Date;

  @Column({ type: "boolean", comment: '是否有健保卡', default: false })
  hasIcCard!: boolean;

  @Column({ type: "enum", enum: CardCode, comment: "卡片異常代碼" })
  cardExceptionCode?: CardCodeWithNumber | CardCodeWithoutNumber;

  @Column({ type: "enum", enum: MedicalType, comment: "就醫類別", default: MedicalType.WESTERN_MEDICINE })
  medicalType!: string;

  @Column({ type: "varchar", nullable: true, comment: '就醫序號', length: 20 })
  medicalNumber?: string;

  @Column({ type: "enum", enum: CaseType, comment: "案件別", default: CaseType.OTHER })
  caseType!: CaseType;

  @Column('bigint', { comment: '醫師id' })
  doctorId!: number;

  @Column({ type: 'bigint', nullable: true, comment: '病人id' })
  patientId?: number;

  @Column({ type: "varchar", comment: 'soap', length: 300 })
  soap?: string;

  @Column({ type: "enum", enum: Status, comment: "門診狀態", default: Status.REGISTER })
  status!: Status;

  @Column({ type: "bigint", comment: "應繳金額", default: 0 })
  payableAmount!: number;

  @Column({ type: "bigint", comment: "已繳金額", default: 0 })
  paidAmount!: number;

  @OneToOne(() => ReservationDetail, rd => rd.clinic, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
  @JoinColumn([{ name: 'reservationDetailId', referencedColumnName: 'id' }])
  reservationDetail!: ReservationDetail;
}
