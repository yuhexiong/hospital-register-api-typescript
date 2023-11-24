import { Column, Entity, Generated, OneToMany } from "typeorm";
import { Gender } from "../utils/enum";
import Clinic from "./clinic";
import ReservationDetail from "./reservationDetail";

@Entity('patient')
export default class Patient {
  @Column("bigint", { primary: true, comment: "流水號", })
  @Generated('increment')
  id!: number;

  @Column({ type: "varchar", comment: '姓名', length: 20 })
  name!: string;

  @Column({ type: "varchar", nullable: true, comment: '生日, YYYY-MM-DD', length: 20 })
  birthday?: string;

  @Column({ type: "enum", enum: Gender, comment: "性別", default: Gender.UNKNOWN })
  gender?: Gender;

  @Column({ type: 'varchar', nullable: true, comment: '電子郵件', length: 100 })
  email?: string;

  @Column({ type: 'varchar', nullable: true, comment: '電話', length: 20 })
  phone?: string;

  @OneToMany(() => Clinic, (c) => c.patient)
  clinics?: Clinic[];

  @OneToMany(() => ReservationDetail, (rd) => rd.patient)
  reservationDetails?: ReservationDetail[];
}
