import { Column, Entity, OneToMany } from "typeorm";
import Clinic from "./clinic";
import ReservationOverview from "./reservationOverview";

@Entity('doctor')
export default class Doctor {
  @Column("varchar", { primary: true, name: "id", comment: "醫師工號", length: 20 })
  id!: string;

  @Column({ type: "varchar", comment: '姓名', length: 20 })
  name!: string;

  @OneToMany(() => ReservationOverview, (ro) => ro.doctor)
  reservationOverviews?: ReservationOverview[];

  @OneToMany(() => Clinic, (c) => c.doctor)
  clinics?: Clinic[];

}
