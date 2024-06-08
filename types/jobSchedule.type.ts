export interface JobSchedule {
  startDate: string;
  endDate: string;
  description: string;
  listDayWork: string;
  jobScheduleId: number;
  taskProcess: number;
  onTask: boolean;
  locationWork: string;
}

export type CreateJobScheduleRequest = Pick<
  JobSchedule,
  'description' | 'endDate' | 'listDayWork' | 'startDate'
>;

export type GetJobScheduleRespone = Pick<
  JobSchedule,
  | 'jobScheduleId'
  | 'startDate'
  | 'endDate'
  | 'description'
  | 'locationWork'
  | 'listDayWork'
  | 'taskProcess'
  | 'onTask'
>;
