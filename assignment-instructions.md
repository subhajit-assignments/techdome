# Techdome QA Playwright Assignment — Agent Instructions

Target site: **https://techdome.io**
Stack: **Playwright + Javascript**. Single command to run everything: `npx playwright test`.
Hard constraint: **load tests must never exceed 5 concurrent users, at any point.** Not a soft target — automatic fail if exceeded, mentioned 3x in the source spec.

---

## 1. Repo structure to scaffold

```
your-repo/
├── tests/
│   ├── e2e/
│   ├── integration/
│   ├── security/
│   └── load/
├── utils/
│   ├── helpers.ts
│   └── fixtures.ts
├── docs/
│   ├── user-story-map.md
│   ├── claude-code-log.md
│   ├── bugs.md
│   └── load-test-results.md
├── playwright.config.ts
└── README.md
```

## 2. Known site facts (already confirmed live, use these — don't invent generic ones)

- Framework: SvelteKit-style build (`_app/immutable/assets/...` paths), so expect hydration delays — don't assume instant interactivity after `page.goto`.
- Homepage has an autoplaying background **video** (`headerVideoBg.*.mp4`) in the hero — a candidate for LCP/perf issues and for content that a `toBeVisible` check might race against.
- Nav top-level items: `Expertise`, `Industries`, `Insights` (these look like dropdown/mega-menu triggers, not direct links — confirm actual href behavior, don't assume they navigate), plus direct links `About Us`, `Careers`, `Contact Us`.
- Contact form at `/contact-us` has fields: **Company\*, First Name\*, Last Name\*, Email\*, Phone Number (optional), Message** with a visible **0/250 character counter** on Message, and a "Send Message" submit button. Required fields are marked with `*` — validation behavior on empty submit is untested and worth probing.
- Contact page also has an **email newsletter signup** ("GET UPDATES" — email field + submit) which is a **separate** form from the main contact form — don't conflate them in test cases.
- FAQ accordion on `/contact-us` ("What's the response time for inquiries?", "Can I schedule a consultation or demo?") — expand/collapse interaction, good candidate for a flaky-if-mistested animation-timing case.
- Footer has real outbound links: LinkedIn, Instagram, YouTube, X/Twitter, Facebook — good target for the "external links resolve, no 404s" story, but note these are `target=_blank` external domains, so use `context.waitForEvent('page')` pattern, not same-tab navigation assertions.
- Known internal pages beyond home/contact: `/about-us` (has an anchor `#leaders`), `/careers`, `/case-study`, `/blog-and-article` (+ individual blog post slugs), `/newsletters`, `/privacy-policy`, `/terms-of-use`, and six `/solution/*` service pages (AI, cloud computing, cybersecurity, data analytics, blockchain, business intelligence) and six `/industries/*` pages (health, finance, edtech, IT, e-commerce, manufacturing).
- Company phone number and email are displayed in plaintext on the contact page (`+91 98938 69899`, `contact@techdome.net.in`) — relevant to the "no sensitive data leaked" security story; decide if plaintext contact info displayed intentionally counts as a finding or is expected/non-issue, and justify that call in the story map.

## 3. Part 1 — User Story Map (`docs/user-story-map.md`)

Required template per story:

```
US-001
Title: <short descriptive title>
As a: <persona — visitor / prospect / recruiter>
I want to: <specific action on the site>
So that: <outcome or goal>
Acceptance:
- [ ] <criterion 1>
- [ ] <criterion 2>
Test Type: E2E | Integration | Security | Load
Priority: P0 | P1 | P2
```

Minimum coverage (must be met exactly or exceeded):

| Area | Type | Min stories |
|---|---|---|
| Navigation & page load | E2E | 2 |
| Contact / enquiry form | E2E | 2 |
| CTAs & external links | E2E | 2 |
| Mobile responsiveness (375px, 768px) | E2E | 2 |
| API / form integration | Integration | 3 |
| Security headers & injection | Security | 2 |
| Load (≤5 users) | Load | 1 |

Stories must reflect the actual site (see section 2), not generic boilerplate.

## 4. Part 2 — Playwright Automation Suite

**A. E2E tests (`tests/e2e/`, min 8):**
- Homepage loads with correct title, meta description, hero content
- All nav links resolve — no 404s, no blank pages (account for mega-menu/dropdown behavior on Expertise/Industries/Insights)
- Contact form: valid submission, required-field errors, input validation
- Mobile viewport 375px — nav collapses, layout reflows without overflow
- Mobile viewport 768px — tablet layout renders correctly
- All primary CTAs clickable, route to correct destination
- Footer links + social icons present and functional (external, new-tab)
- Page-level performance: LCP recorded (assertion optional given the video hero)

**B. Integration tests (`tests/integration/`, min 3):**
- Contact form submission triggers correct network request — intercept, assert payload structure
- Any visible API endpoint returns expected HTTP status codes
- Third-party scripts (analytics, chat widget, tracking) load without blocking render — assert no render-blocking calls in critical path

**C. Security tests (`tests/security/`, min 3):**
- HTTP response headers audit — assert presence of `X-Frame-Options`, `Content-Security-Policy`, `Strict-Transport-Security`
- Contact form rejects script injection — submit `<script>alert(1)</script>` in First Name; assert sanitized/rejected
- No sensitive data leaked in page source or network responses — scan for emails/API keys/tokens in HTML and visible network calls (note: company phone/email are intentionally public — don't flag those as leaks)

**D. Load tests (`tests/load/`, exactly 5 users, hard cap):**
- Simulate exactly 5 concurrent users hitting homepage + contact page simultaneously
- Assert p95 response time < 3000ms
- Assert zero HTTP 5xx errors
- Must run as an isolated Playwright project/config so the default test-runner parallelism can't push concurrency above 5 — this is the easiest way to accidentally blow the cap
- Write summary to `docs/load-test-results.md`

## 5. Part 3 — Claude Code Usage Log (`docs/claude-code-log.md`)

Minimum 5 entries, this exact format per entry:

```
## Prompt #1
**What I asked:** <exact prompt>
**What Claude did:** <brief summary of output>
**What I changed / accepted / rejected:** <your judgment call — what you kept, edited, ignored, and why>
---
```

This is graded on judgment shown, not volume. Entries that just say "accepted as-is" every time are a red flag.

## 6. Part 4 — Bug Report (`docs/bugs.md`)

One entry per issue, this exact format:

```
## BUG-001
**Severity:** Critical | High | Medium | Low
**Summary:** <one-line description>
**Steps:**
 1. Go to ...
 2. Click ...
 3. Observe ...
**Expected:** <what should happen>
**Actual:** <what actually happened>
**Evidence:** screenshot / console log / network trace
```

Severity guide:
- **Critical**: site broken/unusable (page won't load, form crashes, JS error blocks core action)
- **High**: key feature broken/degraded (form submits with no confirmation, broken nav, missing CTA)
- **Medium**: functional but noticeable issues (mobile layout breaks, console warnings, slow assets)
- **Low**: cosmetic (typos, misalignment, alt text)

An empty bug list is treated as "didn't look hard enough" — not an acceptable outcome.

## 7. Constraints / non-negotiables for the agent to respect

1. Never exceed 5 concurrent users in any load-test path.
2. `npx playwright test` must pass from a fresh clone with no manual setup beyond `npm install`.
3. Selectors should be resilient (prefer `data-testid`/role-based over brittle text matches), since this is a real production marketing site subject to content changes.
4. Every generated test needs a human review pass — this repo's grading explicitly penalizes unedited AI output. Log each meaningful generation/edit in `docs/claude-code-log.md`.
5. User stories must reference real, confirmed site structure (section 2) — no generic placeholder journeys.

## 8. Submission checklist

- [ ] `docs/user-story-map.md` — complete, all types covered, IDs + acceptance criteria
- [ ] `tests/` — passing suite: E2E ≥8, Integration ≥3, Security ≥3, Load = exactly 5 users
- [ ] `docs/claude-code-log.md` — ≥5 entries with real judgment calls
- [ ] `docs/bugs.md` — all found issues, severity + repro + evidence
- [ ] `docs/load-test-results.md` — response times, error counts, pass/fail verdict
- [ ] `README.md` — single-command run instructions, verified from fresh clone
- [ ] Loom walkthrough (5–10 min) covering decisions, not just green checkmarks — must show failures too
