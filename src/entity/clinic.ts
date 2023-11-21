import { Column, Entity, Generated } from "typeorm";
import { Status } from "../utils/enum";

@Entity('clinic')
export default class Clinic {
  @Column("bigint", { primary: true, comment: "流水號", })
  @Generated('increment')
  id!: number;

  @Column({ type: "varchar", comment: '門診日期, YYYY-MM-DD', length: 20 })
  date!: string;

  @Column({ type: 'datetime', nullable: true, comment: '開始看診時間' })
  beginTime?: Date;

  @Column({ type: 'datetime', nullable: true, comment: '完診時間' })
  finishTime?: Date;

  @Column({ type: "boolean", comment: '是否有健保卡', default: false })
  hasIcCard!: boolean;

  @Column({ type: "varchar", nullable: true, comment: '卡片異常代碼', length: 20 })
  cardExceptionCode?: string;

  @Column({ type: "varchar", comment: '就醫類別', length: 20, default: '01西醫' })
  medicalType!: string;

  @Column({ type: "varchar", nullable: true, comment: '就醫序號', length: 20 })
  medicalNumber?: string;

  @Column({ type: "varchar", comment: '案件別', length: 20, default: '09其他' })
  caseType!: string;

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

}
