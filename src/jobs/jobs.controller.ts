import { Controller, Post, Body, Get } from "@nestjs/common";
import { JobsService } from "./jobs.service";

@Controller("jobs")
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  create(@Body() body: { jobName: string; arguments: string[] }) {
    return this.jobsService.startJob(body.jobName, body.arguments);
  }

  @Get()
  findAll() {
    return this.jobsService.getAllJobs();
  }
}
