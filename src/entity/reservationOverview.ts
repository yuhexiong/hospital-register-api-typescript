import { Column, Entity, Generated, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import ReservationDetail from "./reservationDetail";
import { Division, TimeSlot } from "../utils/enum";
import Doctor from "./doctor";

@Entity('reservationOverview')
export default class ReservationOverview {
  @Column("bigint", { primary: true, comment: "流水號", })
  @Generated('increment')
  id!: number;

  @Column({ type: "varchar", comment: "日期, YYYY-MM-DD", length: 20 })
  date!: string; 

  @Column({ type: 'enum', enum: TimeSlot, comment: "時段" })
  timeSlot!: TimeSlot;

  @Column({ type: "enum", enum: Division, comment: "科別", default: Division.NOT_SPECIFIED })
  division!: Division; 

  @Column('bigint', { comment: '醫師id' })
  doctorId!: number;

  @Column({ type: "boolean", comment: "是否開放預約", default: true })
  canReverse!: boolean;

  @OneToMany(() => ReservationDetail, (rd) => rd.reservationOverview)
  reservationDetails?: ReservationDetail[];

  @ManyToOne(() => Doctor, d => d.clinics, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
  @JoinColumn([{ name: 'doctorId', referencedColumnName: 'id' }])
  doctor?: Doctor;
}

