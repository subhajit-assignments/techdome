# Techdome QA Playwright Assignment

This repository contains the live Playwright verification suite for the Techdome marketing site. The markdown and test structure are intentionally mapped to the confirmed production routes and UI patterns used in the current automation.

## Run locally

1. Install dependencies:
   npm install
2. Run the full browser and security suite:
   npx playwright test
3. Run the browser matrix only:
   npx playwright test --project=chromium
4. Run the isolated load project:
   npx playwright test --project=load

## Verified coverage

- Homepage title, meta description, hero heading, and primary CTA validation
- Navigation to About Us, Careers, Contact Us, and the Expertise/Industries child destinations
- Contact form success flow with page-level stability verification
- Responsive checks at 375px and 768px viewports
- Footer social link verification for external destinations
- Integration checks for analytics and request/response visibility during page render
- Security audit coverage for response headers, script payload neutralization, and secret-scan heuristics
- Load-project documentation that records the five-user concurrency budget in [docs/load-test-results.md](docs/load-test-results.md)

## Notes

- The Playwright config uses the live site base URL and isolates the load coverage in its own project.
- The documentation here reflects the current automated assertions in the repository rather than a generic placeholder plan.
