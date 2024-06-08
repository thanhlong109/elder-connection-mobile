import { Address } from './address.type';
import { CreateJobScheduleRequest, JobSchedule } from './jobSchedule.type';

export interface Post {
  serviceId: number;
  customerId: string;
  addressId: number;
  isPriorityFavoriteConnector: boolean;
  postDescription: string;
  title: string;
  startTime: string;
  postId: number;
  serviceName: string;
  jobSchedule: JobSchedule;
  customerFirstName: string;
  customerLastName: string;
  address: Address;
  postStatus: number;
  createAt: string;
  updateAt: string;
  price: number;
  salaryAfterWork: number;
}

export type CreatePostRequest = Pick<
  Post,
  | 'addressId'
  | 'customerId'
  | 'isPriorityFavoriteConnector'
  | 'postDescription'
  | 'serviceId'
  | 'startTime'
  | 'title'
>;

export interface CreatePostAndScheduleRequest {
  postCreateViewModel: CreatePostRequest;
  jobScheduleCreateViewModel: CreateJobScheduleRequest;
}

export type GetPostRespone = Pick<
  Post,
  | 'postId'
  | 'serviceId'
  | 'serviceName'
  | 'jobSchedule'
  | 'customerId'
  | 'customerFirstName'
  | 'customerLastName'
  | 'address'
  | 'isPriorityFavoriteConnector'
  | 'postDescription'
  | 'title'
  | 'postStatus'
  | 'startTime'
  | 'createAt'
  | 'updateAt'
  | 'price'
  | 'salaryAfterWork'
>;
export type CreatePostAndScheduleResponse = Pick<
  Post,
  | 'postId'
  | 'serviceId'
  | 'serviceName'
  | 'jobSchedule'
  | 'customerId'
  | 'customerFirstName'
  | 'customerLastName'
  | 'address'
  | 'isPriorityFavoriteConnector'
  | 'postDescription'
  | 'title'
  | 'postStatus'
  | 'startTime'
  | 'createAt'
  | 'updateAt'
  | 'price'
  | 'salaryAfterWork'
>;
