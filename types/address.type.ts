import { HomeType } from '~/enums';

export interface Address {
  addressId: number;
  accountId: string;
  addressName: string;
  addressDetail: string;
  addressDescription: string;
  homeType: HomeType;
  contactName: string;
  contactPhone: string;
}

export type AddAdressRequest = Pick<
  Address,
  | 'accountId'
  | 'homeType'
  | 'addressDescription'
  | 'addressDetail'
  | 'addressId'
  | 'addressName'
  | 'contactName'
  | 'contactPhone'
>;

export type AddAdressRespone = Pick<
  Address,
  | 'accountId'
  | 'homeType'
  | 'addressDescription'
  | 'addressDetail'
  | 'addressId'
  | 'addressName'
  | 'contactName'
  | 'contactPhone'
>;

export type GetAddressRespone = Pick<
  Address,
  | 'addressId'
  | 'addressName'
  | 'addressDetail'
  | 'addressDescription'
  | 'homeType'
  | 'contactName'
  | 'contactPhone'
>;

export interface Postion {
  latitude: number;
  longitude: number;
}
