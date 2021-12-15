export const SET_JOBS = "SET_JOBS";
export const SET_ALL_JOBS = "SET_ALL_JOBS";
export const RESET_JOBS = "RESET_JOBS";
export const SHOW_WINDOW = "SHOW_WINDOW";
export const CLOSE_WINDOW = "CLOSE_WINDOW";

export interface IJobsState {
  jobs: Array<string> | null;
  jobsOriginal: Array<string> | null;
  showCreateWindow: boolean;
}

export interface IJobObject {
  date: string;
  image_name: string;
  image_url: string;
  is_active: boolean;
  job_id: string;
  message: string;
  user_twitter_id: string;
  status: string;
}

export enum EOrderJobs {
  datedec = "datedec",
  dateasc = "dateasc",
  status = "status",
}
