import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import ReservationOverview from "./reservationOverview";
import { ReservationType } from "../utils/enum";

@Entity('reservationDetail')
export default class ReservationDetail {
  @Column("varchar", { primary: true, comment: "id", length: 20, })
  id!: string;

  @Column({ type: "datetime", nullable: true, comment: "預約時間" })
  reverseTime?: Date;

  @Column({ type: "varchar", comment: '預約總表id', length: 100 })
  reservationOverviewId!: string;

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

}
