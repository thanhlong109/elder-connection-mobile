export interface Address {
  addressId: number;
  accountId: string;
  addressName: string;
  addressDetail: string;
  addressDescription: string;
  homeType: number;
  contactName: string;
  contactPhone: string;
}

export type AddAdressRequest = Pick<Address, 'accountId' | 'homeType'>;
