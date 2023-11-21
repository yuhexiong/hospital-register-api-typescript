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

// 門診狀態
export enum Status {
  REGISTER = 'REGISTER',     // 掛號(已插健保卡)
  CLINIC = 'CLINIC',         // 看診中
  COMPLETE = 'COMPLETE',     // 完診
  PAID = 'PAID',             // 已批價繳費
  UNREGISTER = 'UNREGISTER', // 退掛
}
