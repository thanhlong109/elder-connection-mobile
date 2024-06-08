export interface Service {
  serviceId: number;
  serviceName: string;
  serviceTypeId: number;
  saleId: number;
  originalPrice: number;
  finalPrice: number;
  serviceTypeHours: string;
  serviceDescription: string;
  ratingAvg: number;
}

export type GetServiceResponse = Pick<
  Service,
  | 'finalPrice'
  | 'originalPrice'
  | 'ratingAvg'
  | 'saleId'
  | 'serviceDescription'
  | 'serviceId'
  | 'serviceName'
  | 'serviceTypeHours'
  | 'serviceTypeId'
>;
