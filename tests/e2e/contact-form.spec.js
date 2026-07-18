import { test, expect } from '../../utils/fixtures.js';

test('contact form accepts a valid enquiry without crashing the page flow', async ({ contactForm, pageErrors }) => {
    await contactForm.open();
    await contactForm.fillSubmission({ company: 'Test 1' });
    await contactForm.submit();
    await contactForm.expectSuccessMessage();

    expect(pageErrors).toEqual([]);
});

// test('contact form keeps the required-field validation state for empty submit', async ({ page }) => {
//     await page.goto('/contact-us');

//     await page.getByRole('button', { name: 'Send Message' }).click();

//     await expect(page.getByText(/Company \*/i)).toBeVisible();
//     await expect(page.getByText(/First Name \*/i)).toBeVisible();
//     await expect(page.getByText(/Last Name \*/i)).toBeVisible();
//     await expect(page.getByText(/Email \*/i)).toBeVisible();
// });
