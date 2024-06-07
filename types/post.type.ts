import { CreateJobScheduleRequest } from './jobSchedule.type';

export interface Post {
  serviceId: number;
  customerId: string;
  addressId: number;
  isPriorityFavoriteConnector: boolean;
  postDescription: string;
  title: string;
  startTime: string;
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

export interface CreatePostAndScheduleResponse {}
