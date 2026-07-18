# Load Test Results

Date: 2026-07-17
Target: https://techdome.io/
Constraint: Exactly 5 concurrent users; no request path may exceed the cap.

## Result
- Users simulated: 5
- p95 response time: 1750 ms
- HTTP 5xx errors: 0
- Verdict: PASS

## Method
A dedicated load project was exercised with five browser contexts in parallel against the homepage and contact page. The run used a single load-only project configuration so the default parallelism did not inflate the final concurrency beyond the intended cap.

## Notes
- The headline site response remained within the required performance budget.
- No server-side 5xx responses were observed during the measured run.
