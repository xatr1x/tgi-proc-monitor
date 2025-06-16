import { Injectable } from "@nestjs/common";
import { spawn } from "child_process";
import { v4 as uuidv4 } from "uuid";
import { Job, JobStatus } from "./job.model";

@Injectable()
export class JobsService {
  private jobs: Map<string, Job> = new Map(); // we keep all in server memory. it is only for MVP

  startJob(jobName: string, args: string[]): Job {
    const id: string = uuidv4();
    const job: Job = {
      id,
      jobName,
      arguments: args,
      status: JobStatus.RUNNING,
      statusHistory: [{ status: JobStatus.RUNNING, at: new Date() }],
      exitCode: null,
      startTime: new Date(),
      endTime: null,
      retryCount: 0,
    };

    const child = spawn("cmd.exe", ["/c", "dummy.bat", ...args]); // we can add logic for other OS
    this.jobs.set(id, job);

    child.on("exit", (code) => {
      job.exitCode = code;
      job.endTime = new Date();

      if (code === 0) {
        job.status = JobStatus.COMPLETED;
        job.statusHistory.push({ status: JobStatus.COMPLETED, at: new Date() });
      } else if (job.retryCount === 0) {
        job.retryCount++;
        job.status = JobStatus.RETRIED;
        job.statusHistory.push({ status: JobStatus.RETRIED, at: new Date() });

        const retryChild = spawn("cmd.exe", [
          "/c",
          "dummy.bat",
          ...job.arguments,
        ]);

        retryChild.on("exit", (retryCode) => {
          job.exitCode = retryCode;
          job.endTime = new Date();
          job.status =
            retryCode === 0 ? JobStatus.COMPLETED : JobStatus.CRASHED;
          job.statusHistory.push({
            status: retryCode === 0 ? JobStatus.COMPLETED : JobStatus.CRASHED,
            at: new Date(),
          });
        });
      } else {
        job.status = JobStatus.CRASHED;
        job.statusHistory.push({ status: JobStatus.CRASHED, at: new Date() });
      }
    });

    return job;
  }

  getAllJobs(): Job[] {
    return Array.from(this.jobs.values());
  }
}
