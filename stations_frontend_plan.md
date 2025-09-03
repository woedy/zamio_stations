# ZamIO Stations Frontend — Development Plan (Living Doc)

Version: 0.1 (living)
Owners: Stations FE (you + Codex), Coordination with Backend/API

## Goals
- Allow stations to see songs detected from their broadcasts.
- Provide compliance reports for licensing authorities (COSGA, GHAMRO).
- Enable transparency in music usage and demonstrate fairness.
- Support live monitoring and one‑off matching for validation/testing.

## Non‑Goals (for now)
- Royalty computation logic (lives in backend services).
- Artist/admin/publisher portals beyond required integrations.
- Public marketing site.

## Users & Roles
- Station Primary Admin (manages account, settings, stream URLs, reports).
- Station Staff (view dashboards, logs, export, raise disputes).
- Internal SoundClaim Reviewers (via admin tool; view dispute context from stations app where applicable).

## Architecture Overview
- App: React + TypeScript + Vite + Tailwind (existing).
- Routing: `react-router-dom` (existing) with `DefaultLayout` wrapper.
- State: Local component state; consider React Query for server state (optional; phase-gated).
- API: `fetch` wrapper with base URL from env, token injection, unified error shape.
- Realtime: WebSocket client for live match push; HTTP polling fallback.
- Auth: Token-based auth (pref. JWT Bearer). Token stored securely; refresh supported by backend.
- Envs: Vite env vars (`VITE_API_URL`, `VITE_WS_URL`, `VITE_MEDIA_URL`). No hardcoded URLs in source.

## Environment & Config
- Files: `.env.development`, `.env.production`, `.env.local` (gitignored).
- Vars: `VITE_API_URL`, `VITE_WS_URL`, `VITE_MEDIA_URL`, `VITE_APP_ENV`.
- Boot: `src/constants.tsx` reads from `import.meta.env` and gracefully falls back in dev.

## Security & Compliance
- Prefer `Authorization: Bearer <JWT>`; if existing token scheme is `Token`, keep compatibility until backend flips.
- Store tokens in HTTP‑only cookies when same‑site is available; otherwise localStorage with strict logout + XSS hygiene.
- Enforce CORS allowlists, HTTPS in prod.
- Do not log PII; add `trace_id` correlation.

## UX Conventions
- Consistent titles via `components/PageTitle`.
- Dark mode supported (existing `useColorMode`).
- Accessible forms, keyboard navigation, color contrast.
- Error toasts with retry actions; non‑blocking loaders.

## Feature Epics & Deliverables

### Epic A: Auth & Onboarding
Deliverables:
- Sign Up / Sign In / Verify email / Forgot & Reset password flows.
- Onboarding wizard: profile, report method, staff, payment info.
- Station identity: resolve `station_id` from “me” endpoint; persist in app store/localStorage.
Acceptance:
- Redirects based on auth; protected routes gated.
- Token refresh or re‑login UX is clear.
Code refs:
- `src/pages/Authentication/*`, `src/App.tsx`, `src/layout/DefaultLayout.tsx`.

### Epic B: Live Monitoring & Upload Match
Deliverables:
- Live radio monitor: start/stop session, live matches feed.
- WebSocket push with auto‑reconnect; HTTP polling fallback (2–3s backoff).
- Upload MP3/WAV to validate matching.
Acceptance:
- Start → session_id received; matches render with confidence and timestamps.
- Stop cleans up timers/sockets.
Code refs:
- `src/pages/PlayGround/RadioStreamMonitor.tsx`, `src/pages/PlayGround/AudioFileMatcher.tsx`.
APIs:
- `POST /api/music-monitor/stream/start/`
- `POST /api/music-monitor/stream/stop/{session_id}/`
- `GET /api/music-monitor/stream/matches/{session_id}/`
- `POST /api/music-monitor/stream/upload/`

### Epic C: Dashboard
Deliverables:
- KPIs: total songs detected, top songs, activity timeline.
- Optional: regional insights, detection confidence quality score.
Acceptance:
- Time‑bounded views (this week/month/custom range).
Code refs:
- `src/pages/Dashboard/Dashboard.tsx`.

### Epic D: Match Log Viewer
Deliverables:
- Full detection table: time, song, artist, confidence, status.
- Search + filters by artist, song, date range, confidence, status.
- Row actions: dispute/flag.
Acceptance:
- Pagination or virtualized list for large datasets.
Code refs:
- `src/pages/MatchLogViewer/FullDetectionTable.tsx`.

### Epic E: Reports & Compliance
Deliverables:
- Monthly report generator; export CSV/PDF.
- Format selector: GHAMRO/COSGA/Custom.
- Archive list (by month/year) with download.
- Proof of compliance certificate.
Acceptance:
- Exports match backend schema; file downloads work across browsers.

### Epic F: Dispute Management
Deliverables:
- Flag/dispute a match with comment; view dispute details and status.
- Statuses: pending, under_review, resolved (upheld|denied).
Acceptance:
- Timeline of actions with timestamps.
Code refs:
- `src/pages/MatchDisputeManagement/*`.

### Epic G: Station Settings & Profile
Deliverables:
- Edit station info; manage stream URLs.
- Account management (password, notifications).
Acceptance:
- Server‑validated forms; saved state reflected in UI.
Code refs:
- `src/pages/StationManagement/StationProfile.tsx`, `src/pages/StationManagement/EditStationProfile.tsx` (if added).

### Epic H: Notification Center
Deliverables:
- In‑app notifications; weekly summaries; compliance reminders.
- Preferences per user.
Acceptance:
- Unread counts; read/dismiss actions persist.
Code refs:
- `src/pages/NotificationCenter/NotificationCenter.tsx`.

### Epic I: Education & Support
Deliverables:
- FAQ/help articles; contact support form.
- Charts for music diversity/balance.
Acceptance:
- Content structured; form submits and creates ticket/email.
Code refs:
- `src/pages/Education&Support/HelpSupport.tsx`.

## Data Contracts (Stable Fields)
Match Event (live/upload):
- Required: `track_id`, `track_title`, `artist_name`, `confidence` (0–100), `hashes_matched`, `station_id`, `session_id`, `matched_at` (ISO), `fingerprint_version`.
- Optional: `album_title`, `play_start`, `play_end`, `source` (live|upload), `duration_ms`.
Dispute:
- `dispute_id`, `play_id`, `reason`, `comment`, `status`, `created_at`, `updated_at`, `actor_id`.
Report:
- `report_id`, `period_start`, `period_end`, `format`, `download_url`, `created_at`.

## Error Handling & Resilience
- Unified API error shape: `{ code, message, details, trace_id }`.
- Toasts for recoverable errors; inline form errors with field mapping.
- Auto‑retry policy for transient network failures; exponential backoff.

## Observability
- Client logging with `trace_id` propagation from backend.
- Basic performance metrics (TTFB, FCP, LCP) in dev; production optional.

## Testing Strategy
- Unit: utility + components with logic (formatting, reducers).
- Integration: API flows (auth, start/stop monitor, upload match) using mock server.
- E2E (Cypress/Playwright): happy paths for auth, dashboard load, exporting, dispute creation.

## Accessibility & Performance
- Keyboard navigable, focus states, aria labels.
- Image/asset optimization, code‑splitting route bundles.
- Avoid blocking main thread; debounce filters/search.

## Release & Deployment
- Branch strategy: trunk with feature branches; PR reviews.
- Build: env‑driven Vite; CI to build/test; artifact deployment.
- Feature flags (optional) for new modules like disputes.

## Risks & Mitigations
- Long‑running streams: memory leaks → ensure cleanup of intervals/sockets.
- Schema drift: version APIs (`/api/v1`) and gate UI parsing robustly.
- Token expiry: refresh flow or clear logout and redirect.

## Open Questions
- Finalize auth token format and storage (Bearer + refresh?).
- WebSocket endpoint shape for match events.
- Report format specs (GHAMRO/COSGA templates) and PDF rendering approach.

## Roadmap Phases & Exit Criteria
Phase 0: Hygiene & Env
- Move base URLs to `VITE_*`, fix `hiddenOnRoutes` mismatch (`/audio-match` → `/audio-stream`), remove hardcoded `station_id`.

Phase 1: Auth & Onboarding
- Complete flows; protect routes; persist station identity.

Phase 2: Monitoring & Upload
- Implement WS + polling fallback; stable match rendering.

Phase 3: Dashboard & Logs
- KPIs and full log with filters/pagination.

Phase 4: Reports & Exports
- Generate and download CSV/PDF; archive list.

Phase 5: Disputes
- Create, view, and track disputes; timeline.

Phase 6: Notifications, Settings, Support
- Preferences, Notification Center, profile/settings, help.

Phase 7: Hardening & Launch
- A11y/perf, QA, smoke tests, deploy.

## Next Actions (Concrete)
1) Create env config and switch `src/constants.tsx` to Vite env.
2) Replace hardcoded station IDs with stored value from login/me.
3) Fix `hiddenOnRoutes` entry for `/audio-stream`.
4) Add WS client with reconnect; fallback polling.
5) Define API client wrapper (headers, error normalization).

