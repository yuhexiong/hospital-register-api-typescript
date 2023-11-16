import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import ReservationOverview from "./reservationOverview";

export enum Type {
  ON_SITE = 'onSite',   // 現場號
  RESERVE = 'reverse',  // 預約號
  ALL = 'all',          // 不限號
  NOT = 'not',          // 不給號
}


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

  @Column({ type: 'enum', enum: Type, comment: "給號類別" })
  type!: Type;

  @Column({ type: 'bigint', nullable: true, comment: '病人id' })
  patientId?: number;

  @Column({ type: "varchar", nullable: true, comment: "備註", length: 200 })
  note?: string;

  @ManyToOne(() => ReservationOverview, (ro) => ro.reservationDetails, { onDelete: "RESTRICT", onUpdate: "RESTRICT", })
  @JoinColumn([{ name: "reservationOverviewId", referencedColumnName: "id" }])
  reservationOverview!: ReservationOverview;

}
