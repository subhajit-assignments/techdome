## BUG-001
**Severity:** Critical
**Summary:** The full Playwright suite cannot run from a fresh checkout because the load project imports a missing `k6` runtime.
**Steps:**
 1. Run `npx playwright test` in the repo root.
 2. Observe the startup of the load project.
 3. Review the terminal error output.
**Expected:** The suite should start and execute the configured projects, including the load coverage, without manual dependency setup beyond `npm install`.
**Actual:** Playwright exits immediately with `Error: Cannot find package 'k6' imported from tests/load/concurrency.spec.js`.
**Evidence:** Fresh terminal run of `npx playwright test` produced exit code 1 before the browser matrix could execute.

## BUG-002
**Severity:** High
**Summary:** The contact form success flow is unstable on the live site and fails to complete the expected post-submit confirmation state.
**Steps:**
 1. Go to https://techdome.io/contact-us/.
 2. Fill the required contact fields with valid values.
 3. Click `Send Message` and observe the page state.
**Expected:** The form should submit successfully with no page-level exception and should show the confirmation message.
**Actual:** The spec times out waiting for the success message, and the page error collector records a live runtime exception involving a dynamically imported module.
**Evidence:** Browser trace and test output from `tests/e2e/contact-form.spec.js` show the success assertion timing out and the page error `Failed to fetch dynamically imported module: https://techdome.io/_app/immutable/entry/app.-xXKkpTg.js`.

## BUG-003
**Severity:** High
**Summary:** Primary CTA navigation is timing out and leaves the page in an unstable state during the footer/navigation flow.
**Steps:**
 1. Go to https://techdome.io/.
 2. Click the `Meet the Minds` CTA.
 3. Observe whether navigation settles to the expected destination within the Playwright timeout.
**Expected:** The CTA should navigate cleanly to the confirmed internal page.
**Actual:** The browser test exceeds the 30-second timeout and tears down the context before the navigation settles.
**Evidence:** `tests/e2e/cta-footer.spec.js` failed in the Chromium run with the browser context closing after the timeout period.

## BUG-004
**Severity:** High
**Summary:** The homepage load test is timing out under Chromium, which indicates a real render or hydration slowdown on the live site.
**Steps:**
 1. Go to https://techdome.io/.
 2. Wait for the page to finish loading.
 3. Observe the content load and title/meta/hero assertions.
**Expected:** The homepage should load and pass the asserted title, meta description, and hero content checks within the test timeout.
**Actual:** The test hangs long enough to exceed the 30-second Playwright timeout, causing browser teardown during the assertion phase.
**Evidence:** `tests/e2e/homepage.spec.js` failed with `Test timeout of 30000ms exceeded`, and the browser context was torn down during cleanup.

## BUG-005
**Severity:** Medium
**Summary:** Mobile 375px homepage rendering is not stable enough to keep the navigation and main content visible within the expected test window.
**Steps:**
 1. Open https://techdome.io/ at a 375x812 viewport.
 2. Inspect the homepage layout after load.
 3. Observe the navigation and hero/content visibility.
**Expected:** The mobile layout should remain usable, without timing out or leaving key UI elements hidden.
**Actual:** The mobile responsive test exceeds the timeout while the context is still being torn down, which suggests a mobile layout or hydration problem rather than a simple assertion mismatch.
**Evidence:** `tests/e2e/mobile.spec.js` reported a 30-second timeout in the 375px mobile flow, with a browser trace and error context captured for the failure.

## BUG-006
**Severity:** High
**Summary:** Internal navigation resolution is not completing reliably on the live site and the page state is timing out during the navigation assertions.
**Steps:**
 1. Go to https://techdome.io/.
 2. Traverse the confirmed internal navigation links.
 3. Observe whether each destination resolves within the default Playwright timeout.
**Expected:** Navigation links should resolve to the correct internal pages without hanging or leaving the page in a broken state.
**Actual:** The navigation suite exceeds the timeout and fails during cleanup, indicating that the site is either rendering too slowly or not settling its navigation transitions as expected.
**Evidence:** `tests/e2e/navigation.spec.js` failed in the Chromium run with `Test timeout of 30000ms exceeded` and a browser context teardown error.

## BUG-007
**Severity:** Medium
**Summary:** The contact page analytics/request tracking test is unstable and fails during page-view tracking cleanup.
**Steps:**
 1. Go to https://techdome.io/contact-us/.
 2. Capture `request` and `response` events during the first render.
 3. Observe the network activity and page teardown.
**Expected:** The contact page should render and emit the expected analytics/request activity without forcing the browser context to close unexpectedly.
**Actual:** The render-tracking test times out during teardown and produces a browser context close error after the page has already been launched.
**Evidence:** `tests/integration/contact-request.spec.js` failed with `browserContext.close: Test ended` while the page was still being torn down and the run recorded a screenshot and trace for the failed case.
