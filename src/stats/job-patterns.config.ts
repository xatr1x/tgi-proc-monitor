import { Job } from "../jobs/job.model";

export type JobPattern = {
  id: string;
  description: string;
  match: (job: Job) => boolean;
};

export const defaultPatterns: JobPattern[] = [
  {
    id: "name-length>10",
    description: "Task name length > 10",
    match: (job) => job.jobName.length > 10,
  },
  {
    id: "has-digits",
    description: "The task name contains numbers",
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
];
