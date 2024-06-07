export interface JobSchedule {
  startDate: string;
  endDate: string;
  description: string;
  listDayWork: string;
}

export type CreateJobScheduleRequest = Pick<
  JobSchedule,
  'description' | 'endDate' | 'listDayWork' | 'startDate'
>;
