export enum ActionStatus {
  APPROVED = 'Đã nhận',
  PENDING = 'Đang chờ',
  DONE = 'Đã xong',
}

export enum MenuStatus {
  SELECTED,
  UN_SELECT,
}

export enum ServiceType {
  SERVICE_4,
  SERVICE_8,
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
}
