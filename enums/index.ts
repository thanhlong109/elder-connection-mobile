export enum PostStatus {
  Posted = 1,
  Public = 2,
  Accepted = 3,
  Completed = 4,
  Cancelled = 5,
}

export enum MenuStatus {
  SELECTED,
  UN_SELECT,
}

export enum ServiceType {
  SERVICE_4 = 4,
  SERVICE_8 = 8,
}

export enum ServicePackageType {
  MONTHLY,
  DAILY,
}

export enum DateStringType {
  SHORT,
  FULL,
}

export enum NotificationType {
  IMPORTANCE,
  NORMAL,
}

export enum DialogType {
  SUCCESS,
  WARNING,
  ERROR,
  INFO,
}

export enum KEYS {
  REFRESH_TOKEN = 'refreshToken',
  ACCESS_TOKEN = 'accessToken',
  EXPIRED_TOKEN = 'expireToke',
  ACCOUNT_ID_TOKEN = 'accountId',
}

export enum HomeType {
  TOWN_HOUSE = 1,
  APARTMENT = 2,
  MANSION = 3,
}

export enum MODE {
  UPDATE,
  CREATE,
  DELETE,
  VIEW,
}

export enum Gender {
  MALE = 1,
  FEMALE = 2,
  ORTHER = 3,
}

export enum SERVICE_ID {
  SERVICE_DATE_4H = 2,
  SERVICE_DATE_8H = 1,
  SERVICE_MONTH_8H = 4,
  SERVICE_MONTH_4H = 3,
}

export enum TransactionStatus {
  Pending = 1,
  Success = 2,
  Failed = 3,
}

export enum TransactionType {
  NAP_TIEN = 1,
  THANH_TOAN = 2,
  NHAN_TIEN = 3,
}

export enum TransactionTypeString {
  NAP_TIEN = 'NAP_TIEN',
  THANH_TOAN = 'THANH_TOAN',
  NHAN_TIEN = 'NHAN_TIEN',
}

export enum Role {
  CUSTOMER = 'Customer',
  CONNECTOR = 'Connector',
}
