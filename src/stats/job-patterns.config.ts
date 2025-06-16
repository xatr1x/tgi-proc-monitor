import { Job } from "../jobs/job.model";

export type JobPattern = {
  id: string;
  description: string;
  match: (job: Job) => boolean;
};

export const defaultPatterns: JobPattern[] = [
  {
    id: "name-length>10",
    description: "The job name length > 10",
    match: (job) => job.jobName.length > 10,
  },
  {
    id: "has-digits",
    description: "The job name contains numbers",
    match: (job) => /\d/.test(job.jobName),
  },
  {
    id: "args>2",
    description: "More than two arguments",
    match: (job) => job.arguments.length > 2,
  },
  {
    id: "arg-contains-test",
    description: 'The argument contains the word "test"',
    match: (job) => job.arguments.some((arg) => arg.includes("test")),
  },
  {
    id: "duration>5000",
    description: "The job duration > 5000ms",
    match: (job) =>
      !!job.endTime && job.endTime.getTime() - job.startTime.getTime() > 5000,
  },
  {
    id: "had-retry",
    description: "The job was restarted once",
    match: (job) => job.retryCount > 0,
  },
  {
    id: "duration<1000",
    description: "Job duration less than 1000ms",
    match: (job) =>
      !!job.endTime && job.endTime.getTime() - job.startTime.getTime() < 1000,
  },
  {
    id: "name-contains-error",
    description: 'The title contains the word "error"',
    match: (job) => /error|fail/i.test(job.jobName),
  },
];
