export enum JobStatus {
  RUNNING = "running",
  COMPLETED = "completed",
  CRASHED = "crashed",
  RETRIED = "retried",
}

export interface Job {
  id: string;
  jobName: string;
  arguments: string[];
  status: JobStatus;
  exitCode: number | null;
  startTime: Date;
  endTime: Date | null;
  retryCount: number;
  statusHistory: { status: JobStatus; at: Date }[];
}
