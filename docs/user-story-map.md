## User Story Map

US-001
Title: Homepage hero and core value proposition load correctly
As a: visitor
I want to: open the homepage and confirm the title, description, hero heading, and primary CTA render
So that: I can validate the site entry experience before exploring further
Acceptance:
- [ ] The homepage title and meta description are present
- [ ] The hero heading and primary CTA are visible on first render
Test Type: E2E
Priority: P0

US-002
Title: Primary navigation resolves to confirmed destination pages
As a: visitor
I want to: use the top navigation items to reach About Us, Careers, and Contact Us
So that: I can explore the company’s key information pages
Acceptance:
- [ ] About Us opens the /about-us page
- [ ] Careers opens the /careers page
- [ ] Contact Us opens the /contact-us page
Test Type: E2E
Priority: P0

US-003
Title: Expertise and Industries menus expose real child destinations
As a: prospect
I want to: hover the Expertise and Industries triggers and click a child link
So that: I can reach a specific solution or industry page without dead ends
Acceptance:
- [ ] Expertise reveals a child link route with a real destination
- [ ] Industries reveals a child link route with a real destination
- [ ] Clicking a child item resolves to a non-blank page route
Test Type: E2E
Priority: P1

US-004
Title: Contact form success path is stable for a valid enquiry submission
As a: prospect
I want to: complete the contact form with valid details and observe a clean confirmation state
So that: the live enquiry flow can be verified without page-level errors
Acceptance:
- [ ] The required form fields are present and interactable on the page
- [ ] A valid submission shows the success confirmation message without pageerror noise
Test Type: E2E
Priority: P0

US-005
Title: Mobile layout remains usable at common viewport breakpoints
As a: visitor
I want to: browse the homepage and contact page at 375px and 768px widths
So that: the content remains readable and navigation remains accessible
Acceptance:
- [ ] The 375px viewport renders without horizontal overflow on the homepage
- [ ] The 768px viewport preserves key content and navigation structure on the contact page
Test Type: E2E
Priority: P1

US-006
Title: Primary CTA and footer social destinations behave as expected
As a: visitor
I want to: trigger the homepage CTA and click the footer social icons
So that: I can confirm the key navigation and external brand destinations are wired correctly
Acceptance:
- [ ] The Meet the Minds CTA routes to the About Us page
- [ ] The footer social links open the expected external pages in a new tab
Test Type: E2E
Priority: P1

US-007
Title: Contact page render triggers a successful analytics request during page-view tracking
As a: QA engineer
I want to: observe the contact page and analytics requests during navigation
So that: I can confirm the page render path remains healthy and the tracking endpoints are reachable
Acceptance:
- [ ] The contact page returns a successful HTTP response
- [ ] Analytics or tracking requests complete successfully during page navigation
Test Type: Integration
Priority: P1

US-008
Title: Security headers are exposed with a measurable baseline during page render
As a: security reviewer
I want to: inspect the HTTP response headers on the homepage and contact page
So that: I can confirm a baseline security-header posture is present
Acceptance:
- [ ] The homepage and contact page each expose a measurable security-header posture
- [ ] Missing header values are treated as a baseline audit result rather than a hard false positive
Test Type: Security
Priority: P1

US-009
Title: Script payloads are neutralized in the public contact form
As a: security reviewer
I want to: submit a script payload in the contact form
So that: I can confirm the page remains stable and the field is sanitized or cleared
Acceptance:
- [ ] A script payload is entered in the first name field
- [ ] The form submission does not produce page-level errors and the field value is cleared
Test Type: Security
Priority: P1

US-010
Title: Page source and network response scan do not reveal secret patterns
As a: security reviewer
I want to: inspect the rendered HTML and visible network traffic for high-risk secret tokens
So that: I can confirm the public site does not leak credentials or secrets beyond public contact details
Acceptance:
- [ ] The page source and response trace are scanned for secret-pattern tokens
- [ ] Only public contact data is treated as intentional, not a leak
Test Type: Security
Priority: P1

US-011
Title: Homepage and contact load remain within the five-user concurrency budget
As a: QA engineer
I want to: generate exactly five simultaneous users against the live pages
So that: I can validate the performance budget with a hard concurrency cap
Acceptance:
- [ ] Exactly five concurrent requests are generated
- [ ] The p95 response time remains below 3000ms
- [ ] There are zero HTTP 5xx responses
Test Type: Load
Priority: P0
