# ZamIO Stations — Delivery Checklist

See also: [TestPlanOrder.md](../TestPlanOrder.md) for the daily smoke order and cross-checks with Artist/Admin.

Legend: [ ] todo, [x] done, [~] in progress

## Hygiene & Environment
- [ ] Switch to Vite envs (`VITE_API_URL`, `VITE_WS_URL`, `VITE_MEDIA_URL`).
- [ ] Refactor `src/constants.tsx` to read from `import.meta.env`.
- [ ] Fix layout route mask: replace `/audio-match` with `/audio-stream` in `hiddenOnRoutes`.
- [ ] Remove hardcoded `station_id` (use stored/"me" value).
- [ ] Add API client wrapper (base URL, token, error shaping).
- [ ] Add `.env.example` with documented variables.

## Authentication & Onboarding
- [ ] Sign In with token handling and error states.
- [ ] Sign Up + Verify Email flow.
- [ ] Forgot/Reset Password (email or OTP).
- [ ] Onboarding wizard: Profile → Report Method → Staff → Payment.
- [ ] “Me” fetch on login to resolve `station_id` and user profile.
- [ ] Protect routes and redirects (unauth → sign-in).

## Live Monitoring & Upload Matching
- [ ] Start monitoring: POST start → `session_id`.
- [ ] Stop monitoring: POST stop/{session_id} and clean up.
- [ ] Live matches: WebSocket push (auto‑reconnect).
- [ ] Polling fallback with backoff when WS unavailable.
- [ ] Display match cards: title, artist, album, confidence, matched_at.
- [ ] Upload & match: `.mp3`/`.wav` with result rendering and errors.
- [ ] Input validation (URL, file size/type) + helpful messages.
- [ ] Online stream capture: configure per‑station stream URL; show ingestion status

## Dashboard
- [ ] KPIs: total songs detected (period/all‑time).
- [ ] Top played songs (period filter).
- [ ] Airplay activity timeline (daily/weekly).
- [ ] Optional: regional insights and detection quality.
- [ ] Loading/empty/error states.

## Match Log Viewer
- [ ] Paginated/virtualized table of detections.
- [ ] Filters: artist, track, date range, confidence, status.
- [ ] Search by song/artist.
- [ ] Row status indicator.
- [ ] Row action: create dispute/flag.

## Reports & Compliance
- [ ] Generate monthly report for selected period.
- [ ] Export format selector (GHAMRO/COSGA/Custom).
- [ ] CSV export.
- [ ] PDF export.
- [ ] Download archive with status and created_at.
- [ ] Proof of compliance certificate download.

## Dispute Management
- [ ] Flag/dispute a detection with reason/comment.
- [ ] Dispute detail view with timeline.
- [ ] Status tracking: pending, under_review, resolved (upheld|denied).
- [ ] Attachments (optional) or links.

## Station Settings & Profile
- [ ] Edit station info (region, genre, contact).
- [ ] Manage stream URLs (add/update/delete, validation).
- [ ] Account management (password, notifications).
- [ ] Notification preferences per user.

## Notification Center
- [ ] In‑app notification list with unread/read state.
- [ ] Weekly summary notification (backend event driven).
- [ ] Compliance reminder before month end.
- [ ] Dismiss / mark all read actions persist.

## Education & Support
- [ ] FAQ/help articles page structure.
- [ ] Contact support form (email/ticket).
- [ ] Educational charts (music diversity/balance).

## Resilience, Security & Quality
- [ ] Unified API error format handling (`code`, `message`, `details`, `trace_id`).
- [ ] Token expiry handling (refresh or forced re‑auth path).
- [ ] Rate limit friendly UI (disable spamming start/stop/upload).
- [ ] CORS configured for prod domains (backend).
- [ ] Accessibility pass (labels, focus, contrast, keyboard nav).
- [ ] Performance pass (bundle size, code‑split, memoization where needed).
- [ ] Logging & trace propagation to correlate client ↔ server.

## Testing
- [ ] Unit tests for utils and core components.
- [ ] Integration tests for API flows (mocked).
- [ ] E2E: auth → dashboard → export → dispute creation.

## Release
- [ ] CI build & lint checks.
- [ ] Staging environment deployment.
- [ ] Smoke test checklist for staging.
- [ ] Production deployment with envs and domain config.

---

Notes:
- Keep this checklist updated as items move to [~] or [x].
- Link PRs/issues next to items when possible.
