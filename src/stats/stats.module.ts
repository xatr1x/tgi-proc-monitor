import { Module } from "@nestjs/common";
import { StatsController } from "./stats.controller";
import { StatsService } from "./stats.service";
import { PatternsRepository } from "./patterns.repository";
import { JobsModule } from "src/jobs/jobs.module";

@Module({
  imports: [JobsModule],
  controllers: [StatsController],
  providers: [StatsService, PatternsRepository],
})
export class StatsModule {}
