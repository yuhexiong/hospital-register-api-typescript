import { DataSource } from "typeorm";
import * as dotenv from 'dotenv';
import Clinic from "./src/entity/clinic";
import Doctor from "./src/entity/doctor";
import Patient from "./src/entity/patient";
import ReservationOverview from "./src/entity/reservationOverview";
import ReservationDetail from "./src/entity/reservationDetail";

dotenv.config()

export const AppDataSource = new DataSource({
  type: "mariadb",
  host: process.env.DB_HOST || "127.0.0.1",
  port: (process.env.DB_PORT as unknown) as number || 3306,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "password",
  database: process.env.DB_NAME || "hospital",
  bigNumberStrings: false,
  synchronize: false,
  logging: true,
  entities: [ Clinic, Doctor, Patient, ReservationOverview, ReservationDetail ],
  migrations: [`src/migrations/*.{ts,js}`],
  subscribers: [],
})
