# Specs

This directory keeps the high-level verification plan and test-matrix summary for the current Playwright assignment.

## Current coverage map

- E2E: homepage, navigation, contact flow, responsive layouts, CTA routing, and footer social links
- Integration: analytics/request visibility during the contact page render
- Security: response-header posture, script injection neutralization, and source/network secret-scan checks
- Load: exactly five concurrent browser users against the live site, with the documented result stored in docs/load-test-results.md

## Active test locations

- tests/e2e/
- tests/integration/
- tests/security/
- tests/load/

This file is intentionally aligned to the executable suite in the repository, not to a generic template.
