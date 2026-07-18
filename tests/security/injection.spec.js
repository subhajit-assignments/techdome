import { test, expect } from '../../utils/fixtures.js';

test('contact form neutralizes a script payload in the first-name field without crashing', async ({ page, contactForm, pageErrors }) => {
    await contactForm.open();
    await contactForm.fillSubmission({
        company: 'Acme',
        firstName: '<script>alert(1)</script>',
        message: 'Malicious payload check.',
    });
    await contactForm.submit();
    await page.waitForTimeout(500);

    await expect(page.getByLabel('First Name *')).toHaveValue('');
    expect(pageErrors).toEqual([]);
});
