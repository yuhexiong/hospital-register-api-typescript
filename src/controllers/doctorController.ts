import { AppDataSource } from "../../dataSource";
import Doctor from "../entity/doctor";
import { MyError } from "../utils/errorMessage";

interface CreateDoctorOption {
  id: string;
  name: string;
}

export default class DoctorController {
  /**
   * 新增一位醫師
   * @param option 
   * @returns 
   */
  public static async createDoctor(option: CreateDoctorOption) {
    const { id, name } = option;

    const doctor = await AppDataSource.getRepository(Doctor)
      .createQueryBuilder('doctor')
      .where('doctor.id=:id', { id })
      .getOne();

    if (doctor) {
      throw new MyError(MyError.INVALID_PARAMETER, `doctorId ${id} exists`);
    }

    return await AppDataSource.createQueryBuilder()
      .insert()
      .into(Doctor)
      .values({ id, name })
      .execute();
  }

  /**
   * 由id取得一位醫師
   * @param doctorId 
   * @returns 
   */
  public static async getDoctor(doctorId: string) {
    const doctor = await AppDataSource.getRepository(Doctor)
      .createQueryBuilder('doctor')
      .where('doctor.id=:id', { id: doctorId })
      .getOne();

    if (!doctor) {
      throw new MyError(MyError.INVALID_PARAMETER, `doctor ${doctorId} not found`);
    }

    return doctor;
  }

  /**
   * 取得所有醫師
   * @returns 
   */
  public static async getAllDoctors() {
    return await AppDataSource.getRepository(Doctor)
      .createQueryBuilder('doctor')
      .getMany();
  }

  /**
   * 修改一位醫師名字
   * @param doctorId 
   * @param name 
   * @returns 
   */
  public static async updateDoctorName(doctorId: string, name: string) {
    return await AppDataSource.getRepository(Doctor)
      .createQueryBuilder('doctor')
      .update()
      .set({ name })
      .where('doctor.id=:id', { id: doctorId })
      .execute();
  }

}