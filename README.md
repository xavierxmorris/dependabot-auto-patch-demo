# 🤖 Dependabot Auto-Patch Demo

> A sample Node.js project that demonstrates **GitHub Dependabot** with **automatic merging** of patch and minor dependency updates.

## What This Demo Shows

| Capability | How It Works |
|---|---|
| **Dependency monitoring** | `dependabot.yml` scans npm packages daily and GitHub Actions weekly |
| **Auto-approve + auto-merge** | A GitHub Actions workflow approves and squash-merges patch/minor PRs |
| **CI gate** | PRs only merge after tests and lint pass (`ci.yml`) |
| **Grouped updates** | Patch and minor bumps are grouped into fewer PRs to reduce noise |
| **Major version protection** | Major bumps are left open for manual review |

## Architecture

```
┌────────────────────────────┐
│   Dependabot (GitHub)      │
│   Scans package.json daily │
└──────────┬─────────────────┘
           │ Opens PR
           ▼
┌────────────────────────────┐     ┌─────────────────────────┐
│  CI Workflow (ci.yml)      │────▶│  Tests + Lint pass?     │
│  Node 18 & 20 matrix      │     │  ✅ Yes → continue      │
└──────────┬─────────────────┘     │  ❌ No  → PR blocked    │
           │                       └─────────────────────────┘
           ▼
┌────────────────────────────────────────────┐
│  Auto-Merge Workflow                       │
│  (dependabot-auto-merge.yml)               │
│                                            │
│  1. Fetch metadata (update type)           │
│  2. If patch/minor → approve + auto-merge  │
│  3. If major → skip (manual review)        │
│  4. Log summary to GitHub Step Summary     │
└────────────────────────────────────────────┘
```

## Intentionally Outdated Dependencies

These are **pinned to older versions** so Dependabot has something to update:

| Package | Pinned Version | Purpose |
|---------|---------------|---------|
| express | 4.18.2 | Web framework |
| lodash | 4.17.20 | Utility library |
| axios | 1.5.0 | HTTP client |
| dayjs | 1.11.9 | Date library |
| jest | 29.6.0 | Test runner |
| eslint | 8.45.0 | Linter |
| supertest | 6.3.3 | HTTP test helper |

## Quick Start

```bash
# Clone and install
git clone https://github.com/xavierxmorris/dependabot-auto-patch-demo.git
cd dependabot-auto-patch-demo
npm install

# Run tests
npm test

# Start the server
npm start
# → http://localhost:3000/health
```

## Endpoints

| Route | Description |
|-------|-------------|
| `GET /health` | Health check with dependency versions |
| `GET /api/users` | Users grouped by role (lodash demo) |
| `GET /api/joke` | Random joke from external API (axios demo) |
| `GET /api/time` | Current time in multiple formats (dayjs demo) |

## Repository Settings Required

After pushing, configure these in **GitHub → Settings**:

1. **General → Pull Requests** → ✅ Enable *Allow auto-merge*
2. **Actions → General → Workflow permissions** → ✅ *Allow GitHub Actions to create and approve pull requests*
3. **Branches → Branch protection rule** for `main`:
   - ✅ Require status checks to pass before merging
   - Add `test (18)` and `test (20)` as required checks

## Demo Script

1. **Show the config files** — walk through `dependabot.yml` and `dependabot-auto-merge.yml`
2. **Wait for Dependabot** — it runs on the configured schedule (daily for npm)
3. **Or trigger manually** — go to **Insights → Dependency graph → Dependabot** and click *Check for updates*
4. **Watch the PRs** — Dependabot opens grouped PRs for patch and minor updates
5. **Watch the automation** — the auto-merge workflow approves and merges after CI passes
6. **Check the Actions tab** — see the step summary with dependency details
7. **Show a major bump** — if one appears, it stays open for manual review

## Key Files

```
.github/
├── dependabot.yml                    # Dependabot config (schedule, groups, labels)
└── workflows/
    ├── ci.yml                        # Test + lint pipeline
    └── dependabot-auto-merge.yml     # Auto-approve & merge workflow
src/
└── index.js                          # Express app using outdated deps
test/
└── index.test.js                     # Jest tests
```

## License

MIT
