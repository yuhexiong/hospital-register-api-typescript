import { AppDataSource } from "../../dataSource";
import Patient from "../entity/patient";
import { Gender } from "../utils/enum";
import { removeUndefined } from "../utils/orm";

interface CreatePatientOption {
  name: string;
  birthday?: string;
  gender?: Gender;
  email?: string;
  phone?: string;
}

interface UpdatePatientOption {
  name?: string;
  birthday?: string;
  gender?: Gender;
  email?: string;
  phone?: string;
}

export default class PatientController {
  /**
   * 新增一位病人
   * @param option 
   * @returns 
   */
  public static async createPatient(option: CreatePatientOption) {
    const { name, birthday, gender, email, phone } = option;

    return await AppDataSource.createQueryBuilder()
      .insert()
      .into(Patient)
      .values({ name, birthday, gender: gender ?? Gender.UNKNOWN, email, phone })
      .execute();
  }

  /**
   * 由姓名取得符合的病人, 支援正規表達式搜尋
   * @param patientName 
   * @returns 
   */
  public static async getPatientByName(patientName: string) {
    const patients = await AppDataSource.getRepository(Patient)
      .createQueryBuilder('patient')
      .where('patient.name REGEXP :name', { name: patientName })
      .getMany();

    return patients;
  }

  /**
   * 由id取得一位病人
   * @param patientId 
   * @returns 
   */
  public static async getPatientById(patientId: number) {
    const patient = await AppDataSource.getRepository(Patient)
      .createQueryBuilder('patient')
      .where('patient.id=:id', { id: patientId })
      .getOne();

    if (!patient) {
      throw new Error(`patient ${patientId} not found`);
    }

    return patient;
  }

  /**
   * 取得所有病人
   * @returns 
   */
  public static async getAllPatients() {
    return await AppDataSource.getRepository(Patient)
      .createQueryBuilder('patient')
      .getMany();
  }

  /**
   * 修改一位病人
   * @param patientId 
   * @param option 
   * @returns 
   */
  public static async updatePatient(patientId: number, option: UpdatePatientOption) {
    const { name, birthday, gender, email, phone } = option;
    const updateData = removeUndefined({ name, birthday, gender, email, phone });

    return await AppDataSource.getRepository(Patient)
      .createQueryBuilder('patient')
      .update()
      .set(updateData)
      .where('patient.id=:id', { id: patientId })
      .execute();
  }

  /**
   * 刪除一位病人
   * @param patientId 
   * @returns 
   */
  public static async deletePatient(patientId: number) {
    return await AppDataSource.getRepository(Patient)
      .createQueryBuilder('patient')
      .delete()
      .where('patient.id=:id', { id: patientId })
      .execute();
  }
}