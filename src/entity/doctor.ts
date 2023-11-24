import { Column, Entity, Generated, OneToMany } from "typeorm";
import { Gender } from "../utils/enum";
import Clinic from "./clinic";
import ReservationDetail from "./reservationDetail";
import ReservationOverview from "./reservationOverview";

@Entity('doctor')
export default class Doctor {
  @Column("bigint", { primary: true, comment: "流水號", })
  @Generated('increment')
  id!: number;

  @Column({ type: "varchar", comment: '醫師工號', length: 20 })
  doctorNo!: string;

  @Column({ type: "varchar", comment: '姓名', length: 20 })
  name!: string;

  @OneToMany(() => ReservationOverview, (ro) => ro.doctor)
  reservationOverviews?: ReservationOverview[];

  @OneToMany(() => Clinic, (c) => c.doctor)
  clinics?: Clinic[];

}
