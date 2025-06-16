import { Body, Controller, Get, Post } from "@nestjs/common";
import { StatsService } from "./stats.service";
import { PatternsRepository } from "./patterns.repository";
import { JobPattern } from "./job-patterns.config";

@Controller("stats")
export class StatsController {
  constructor(
    private readonly statsService: StatsService,
    private readonly patternsRepo: PatternsRepository,
  ) {}

  @Post("patterns")
  addPattern(@Body() patternDto: { id: string; description: string }) {
    const newPattern: JobPattern = {
      ...patternDto,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      match: (job) => false, // temporary is non active. this can be implemented in prod
    };

    this.patternsRepo.addPattern(newPattern);
    return { message: "Pattern added" };
  }

  @Get()
  getStats() {
    return this.statsService.getStatistics();
  }
}
