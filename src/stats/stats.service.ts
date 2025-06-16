import { Injectable } from "@nestjs/common";
import { JobsService } from "../jobs/jobs.service";
import { PatternsRepository } from "./patterns.repository";
import { JobStatus } from "../jobs/job.model";

@Injectable()
export class StatsService {
  constructor(
    private readonly jobsService: JobsService,
    private readonly patternsRepo: PatternsRepository,
  ) {}

  getStatistics() {
    const jobs = this.jobsService
      .getAllJobs()
      .filter((j) =>
        [JobStatus.COMPLETED, JobStatus.CRASHED].includes(j.status),
      );
    const total = jobs.length;
    const successful = jobs.filter(
      (j) => j.status === JobStatus.COMPLETED,
    ).length;
    const overallSuccessRate = total > 0 ? successful / total : 0;

    const patterns = this.patternsRepo.getAll();

    const patternStats = patterns.map((p) => {
      const matching = jobs.filter(p.match);
      const matchCount = matching.length;
      const successCount = matching.filter(
        (j) => j.status === JobStatus.COMPLETED,
      ).length;
      const successRate = matchCount > 0 ? successCount / matchCount : 0;
      const diff = successRate - overallSuccessRate;
      const formattedDiff =
        diff === 0
          ? "0%"
          : diff > 0
            ? `+${(diff * 100).toFixed(0)}%`
            : `${(diff * 100).toFixed(0)}%`;

      return {
        pattern: p.id,
        description: p.description,
        matchCount,
        successRate: Number(successRate.toFixed(2)),
        differenceFromAverage: formattedDiff,
      };
    });

    return {
      totalJobs: total,
      overallSuccessRate: Number(overallSuccessRate.toFixed(2)),
      patterns: patternStats,
    };
  }
}
