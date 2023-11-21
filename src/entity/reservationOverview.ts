import { Column, Entity, Generated, OneToMany } from "typeorm";
import ReservationDetail from "./reservationDetail";
import { TimeSlot } from "../utils/enum";

@Entity('reservationOverview')
export default class ReservationOverview {
  @Column("bigint", { primary: true, comment: "流水號", })
  @Generated('increment')
  id!: number;

  @Column({ type: "varchar", comment: "日期, YYYY-MM-DD", length: 20 })
  date!: string; 

  @Column({ type: 'enum', enum: TimeSlot, comment: "時段" })
  timeSlot!: TimeSlot;

  @Column({ type: "varchar", comment: "科別", length: 25 })
  division!: string; 

  @Column('bigint', { comment: '醫師id' })
  doctorId!: number;

  @Column({ type: "boolean", comment: "是否開放預約", default: true })
  canReverse!: boolean;

  @OneToMany(() => ReservationDetail, (rd) => rd.reservationOverview)
  reservationDetails?: ReservationDetail[];

}

