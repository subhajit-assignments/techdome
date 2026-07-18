import { test, expect } from '@playwright/test';

test.describe.serial('Navigation', () => {
    test('primary CTA buttons route to confirmed destinations', async ({ page }) => {
        await page.goto('/', { waitUntil: 'load' });

        await page.getByRole('link', { name: 'Meet the Minds' }).click();
        await expect(page).toHaveURL(/about-us/);

        await page.goto('/', { waitUntil: 'load' });
        await page.getByRole('link', { name: 'Expand Your Knowledge' }).click();
        await expect(page).toHaveURL(/contact-us/);
    });

    test('footer social icons open the correct external pages', async ({ page, context }) => {
        await page.goto('/');

        const socialLinks = [
            {
                name: 'linkedin.com icon',
                expected: /linkedin\.com\/company\/techdome-solutions/i,
            },
            {
                name: 'instagram.com icon',
                expected: /instagram\.com\/techdome\.io/i,
            },
            {
                name: 'youtube.com icon',
                expected: /youtube\.com\/channel\/UCDzAGKRHUlISf_jJPR7Cp1w/i,
            },
            {
                name: 'twitter.com icon',
                expected: /(?:x|twitter)\.com\/techdomesolves/i,
            },
            {
                name: 'facebook.com icon',
                expected: /facebook\.com/i, // or use the exact expected page if required
            },
        ];

        for (const link of socialLinks) {
            const [popup] = await Promise.all([
                context.waitForEvent('page'),
                page.getByRole('link', { name: link.name }).click(),
            ]);

            await popup.waitForLoadState('domcontentloaded');

            // Wait until navigation/redirects settle.
            await expect
                .poll(() => popup.url(), { timeout: 30000 })
                .toMatch(link.expected);

            await popup.close();
        }
    });

});