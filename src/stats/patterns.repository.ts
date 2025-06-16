import { Injectable } from "@nestjs/common";
import { JobPattern, defaultPatterns } from "./job-patterns.config";

@Injectable()
export class PatternsRepository {
  private patterns: JobPattern[] = [...defaultPatterns];

  getAll(): JobPattern[] {
    return this.patterns;
  }

  addPattern(pattern: JobPattern): void {
    this.patterns.push(pattern);
  }
}
