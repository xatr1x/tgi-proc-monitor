# 🧠 TGI Process Monitor

A lightweight backend service for tracking, executing, and analyzing system jobs.

Built with [NestJS](https://nestjs.com/), the app spawns local OS-level scripts (e.g. `.bat`) as subprocesses, monitors their execution, and computes runtime statistics based on customizable patterns.

---

## 🚀 Getting Started

### 📦 Requirements

- Node.js (v18+ recommended)
- npm or yarn

### 🛠 Installation

```bash
npm install
```

### ▶ Start the App

```bash
npm run start
```

App runs by default on:  
`http://localhost:3000`

---

## 📂 Project Structure

```
src/
├── jobs/               # Job execution and lifecycle tracking
│   ├── job.model.ts    # Job interface and JobStatus enum
│   ├── jobs.service.ts # Core job manager
│   ├── jobs.controller.ts
│   └── jobs.module.ts
├── stats/              # Rule engine and statistical analysis
│   ├── job-patterns.config.ts # Default pattern definitions
│   ├── patterns.repository.ts # In-memory rule store
│   ├── stats.service.ts       # Stats engine
│   ├── stats.controller.ts
│   └── stats.module.ts
└── main.ts             # NestJS bootstrap
```

---

## 📡 API Endpoints

### `POST /jobs`

Run a new system job (batch script).

**Request body:**
```json
{
  "jobName": "test-job",
  "arguments": ["arg1", "arg2"]
}
```

**Behavior:**
- Launches `dummy.bat` as a child process.
- Tracks execution time, status, and retry attempts.

---

### `GET /jobs`

Returns a list of all previously executed jobs, including metadata.

**Sample response:**
```json
[
  {
    "id": 1,
    "jobName": "test-job",
    "arguments": ["arg1"],
    "status": "completed",
    "retryCount": 0,
    "exitCode": 0,
    "startTime": "...",
    "endTime": "...",
    "statusHistory": [
      { "status": "started", "at": "..." },
      { "status": "completed", "at": "..." }
    ]
  }
]
```

---

### `GET /stats`

Returns summary statistics based on preconfigured job patterns.

**Example output:**
```json
{
  "totalJobs": 10,
  "overallSuccessRate": 0.8,
  "patterns": [
    {
      "pattern": "name-length>10",
      "description": "The job name length > 10",
      "matchCount": 3,
      "successRate": 1.0,
      "differenceFromAverage": "+20%"
    }
  ]
}
```

---

### `POST /stats/patterns`

Adds a new analytical pattern for runtime statistics.

**Request body:**
```json
{
  "id": "custom-length-check",
  "description": "Name longer than 20 characters"
}
```

💡 *Dynamic logic not yet supported via API. All added patterns are currently non-functional placeholders (match always returns false). This is noted in comments for future extension.*

---

## 🧠 Built-in Job Patterns

Located in [`src/stats/job-patterns.config.ts`](src/stats/job-patterns.config.ts)

Examples include:
- `duration>5000` — long-running jobs
- `args>2` — argument-heavy jobs
- `name-contains-error` — jobs with suspicious names
- `duration<1000` — suspiciously short jobs
- `had-retry` — jobs that required at least one retry

These patterns power the `/stats` endpoint.

---

## ⚙ Dummy Script

The app expects a `dummy.bat` script to exist in the root directory.

Sample content:
```bat
@echo off
echo Simulating work with args: %*
timeout /t 2 >nul
exit /b 0
```

🔴 On macOS/Linux, this script won't run. Consider replacing it with a bash `.sh` version or adjusting `spawn(...)` in `jobs.service.ts`.

---

## 📌 TODO / Ideas

- [ ] Support dynamic match conditions via string-based pattern functions
- [ ] Export stats as CSV/JSON
- [ ] Store jobs and patterns in a database
- [ ] Add per-job logs and error messages
- [ ] Implement pagination and filters in `/jobs`

---

## 🧪 Author Notes

This project was created as a test assignment. The design favors modularity and flexibility, so it can easily evolve into a production-ready job monitor, CI runner, or analytics service.
