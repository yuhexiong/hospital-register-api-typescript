// 預約時段別
export enum TimeSlot {
  MORNING = 'morning',
  AFTERNOON = 'afternoon',
  EVENING = 'evening',
}

// 預約給號類別
export enum ReservationType {
  ON_SITE = 'onSite',   // 現場號
  RESERVE = 'reverse',  // 預約號
  ALL = 'all',          // 不限號
  NOT = 'not',          // 不給號
}

// 有就醫序號的卡片異常代碼
export enum CardCodeWithNumber {
  EQUIPMENT_FAILURE = 'A001',        // 讀卡設備故障
  MACHINE_FAILURE = 'A011',          // 讀卡機故障
  NETWORK_FAILURE = 'A021',          // 網路故障造成讀卡機無法使用
  SECURITY_MODULE_FAILURE = 'A031',  // 安全模組故障造成讀卡機無法使用
  CARD_CHIP_ISSUE = 'B001',          // 卡片不良(表面正常, 晶片異常)
  POWER_OUTAGE = 'C001',             // 停電
  HIS_FAILURE = 'D001',              // 醫療資訊系統(HIS)當機
  COMPUTER_FAILURE = 'D011',         // 醫療院所電腦故障
  NHI_SYSTEM_FAILURE = 'E001',       // 健保總局資訊系統當機
  REMOTE_AREA = 'F000',              // 醫事機構赴偏遠地區因無電話撥接上網設備
  OTHER = 'Z001',                    // 其他
}

// 沒有就醫序號的卡片異常代碼
export enum CardCodeWithoutNumber {
  EQUIPMENT_FAILURE = 'A000',        // 讀卡設備故障
  MACHINE_FAILURE = 'A010',          // 讀卡機故障
  NETWORK_FAILURE = 'A020',          // 網路故障造成讀卡機無法使用
  SECURITY_MODULE_FAILURE = 'A030',  // 安全模組故障造成讀卡機無法使用
  CARD_CHIP_ISSUE = 'B000',          // 卡片不良(表面正常, 晶片異常)
  POWER_OUTAGE = 'C000',             // 停電
  HIS_FAILURE = 'D000',              // 醫療資訊系統(HIS)當機
  COMPUTER_FAILURE = 'D010',         // 醫療院所電腦故障
  NHI_SYSTEM_FAILURE = 'E000',       // 健保總局資訊系統當機
  REMOTE_AREA = 'F000',              // 醫事機構赴偏遠地區因無電話撥接上網設備
  OTHER = 'Z000',                    // 其他
}

export const CardCode = {
  ...CardCodeWithNumber,
  ...CardCodeWithoutNumber,
}
type CardCode = CardCodeWithNumber | CardCodeWithoutNumber

// 就醫類別
export enum MedicalType {
  WESTERN_MEDICINE = '01', // 西醫門診
  DENTAL = '02', // 牙醫門診
  CHINESE_MEDICINE_OUTPATIENT = '03', // 中醫門診
  EMERGENCY = '04', // 急診
  HOSPITALIZATION = '05', // 住院
  REFERRAL = '06', // 轉診就醫
  FOLLOW_UP_AFTER_SURGERY = '07', // 手術回診
  AFTER_DISCHARGE = '08', // 出院回診

  TREATMENT_LIMITED_6_TIMES = 'AA', // 同一療程項目以6次以內治療為限者
  TREATMENT_NOT_LIMITED_6_TIMES = 'AB', // 同一療程項目屬"非"6次以內治療為限者
  PHC = 'AC', // 預防保健
  OCCUPATIONAL_INJURY = 'AD', // 職業傷害或職業病 門(急)診
  CHRONIC_PRESCRIPTION = 'AE', // 慢性病連續處方箋領藥
  PHARMACY_DISPENSING = 'AF', // 藥局調劑
  SCHEDULED_CHECKUP = 'AG', // 排程檢查
  HOME_CARE_AFTER_SECOND_TIME = 'AH', // 居家照護(第二次以後)
  SAME_DOCTOR = 'AI', // 同日同醫師(第二次以後)

  EMERGENCY_OUTPATIENT_TO_HOSPITAL = 'BA', // 門（急）診當次轉住院之入院
  DISCHARGE = 'BB', // 出院
  EXECUTION_ITEMS_EMERGENCY_OR_HOSPITALIZATION = 'BC', // 急診中、住院中執行項目
  DISCHARGE_AFTER_2ND_DAY_EMERGENCY = 'BD', // 急診第二日﹝含﹞以後之離院
  OCCUPATIONAL_INJURY_HOSPITALIZATION = 'BE', // 職業傷害或職業病之住院
  CONTINUATION_HOSPITALIZATION_SETTLED = 'BF', // 住院結清

  OTHERS = 'CA', // 其他

  TRANSFER = 'DA', // 門診轉出
  SURGERY_7_DAYS = 'DB', // 手術7天內回診
  HOSPITALIZED_7_DAYS = 'DC', // 住院7天內回診

  CANCEL_ALL_24_HOURS = 'ZA', // 取消24小時內所有就醫類別
  CANCEL_PARTIAL_24_HOURS = 'ZB', // 取消24小時內部分就醫類別

  PHC_WOMEN_CERVICAL_SMEAR = 'YC', // 婦女子宮頸抹片檢查
  PHC_CHILD_DENTAL = 'YD', // 兒童牙齒預防保健  
  PHC_CHILD_HEALTH_CHECK_CLINIC = 'YA', // 兒童健檢診所
  PHC_WOMEN_BREAST_EXAMINATION = 'YE', // 婦女乳房檢查 
  PHC_CHILD_HEALTH_CHECK_HOSPITAL = 'YA', // 兒童健檢醫院
  PHC_PREGNANT_EXAMINATION_CLINIC = 'XA', // 孕婦產檢院所
  PHC_ADULT_HEALTH_CHECK = 'YB', // 成人預防保健
  PHC_FLU_VACCINE_65_YEARS_OLD = 'YF', // 65歲老人流感疫苗 
  PHC_QUANTITATIVE_FECAL_OCCULT_BLOOD_TEST = 'YG', // 定量免疫法糞便潛血檢查
  PHC_ORAL_EXAMINATION = 'YH', // 口腔黏膜檢查
}

// 案件別
export enum CaseType {
  WESTERN_MEDICINE_NORMAL = "01",     // 西醫一般案件
  WESTERN_MEDICINE_EMERGENCY = "02",  // 西醫急診
  SURGERY = "03",                     // 西醫門診手術
  CHRONIC = "04",                     // 西醫慢性病
  TUBERCULOSIS = "06",                // 結核病
  CHRONIC_PRESCRIPTION = "08",        // 慢性病連續處方調劑
  OTHER = "09",                       // 西醫其他專案
  PHC = "A3",                         // 預防保健
  OCCUPATION = "B6",                  // 職災案件
  QUIT_SMOKING = "B7",                // 行政協助門診戒菸
  AIDS = "D1",                        // 行政協助性病患者全面篩檢愛滋病毒計畫
  VACCINE = "D2"                      // 愛滋防治治療替代治療計畫
}

// 門診狀態
export enum Status {
  REGISTER = 'REGISTER',     // 掛號(已插健保卡)
  CLINIC = 'CLINIC',         // 看診中
  COMPLETE = 'COMPLETE',     // 完診
  PAID = 'PAID',             // 已批價繳費
  UNREGISTER = 'UNREGISTER', // 退掛
}
