import { Column, Entity, Generated, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import ReservationOverview from "./reservationOverview";
import { ReservationType } from "../utils/enum";
import Clinic from "./clinic";
import Patient from "./patient";

@Entity('reservationDetail')
export default class ReservationDetail {
  @Column("bigint", { primary: true, comment: "流水號", })
  @Generated('increment')
  id!: number;

  @Column({ type: "datetime", nullable: true, comment: "預約時間" })
  reverseTime?: Date;

  @Column({ type: "bigint", comment: '預約總表id' })
  reservationOverviewId!: number;

  @Column({ type: 'bigint', comment: '看診號' })
  no!: number;

  @Column({ type: 'enum', enum: ReservationType, comment: "給號類別" })
  type!: ReservationType;

  @Column({ type: 'bigint', nullable: true, comment: '病人id' })
  patientId?: number;

  @Column({ type: "varchar", nullable: true, comment: "備註", length: 200 })
  note?: string;

  @ManyToOne(() => ReservationOverview, (ro) => ro.reservationDetails, { onDelete: "RESTRICT", onUpdate: "RESTRICT", })
  @JoinColumn([{ name: "reservationOverviewId", referencedColumnName: "id" }])
  reservationOverview!: ReservationOverview;

  @OneToOne(() => Clinic, (c) => c.reservationDetail)
  clinic?: Clinic;

  @ManyToOne(() => Patient, p => p.reservationDetails, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
  @JoinColumn([{ name: 'patientId', referencedColumnName: 'id' }])
  patient?: Patient;
}
