import { test, expect } from '@playwright/test';

test.describe.serial('Responsive Design Tests', () => {
    test('mobile 375px layout keeps navigation and main content visible on the homepage', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 812 });
        await page.goto('/');

        await expect(page.getByRole('link', { name: 'About Us' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Trusted Partner in Digital Excellence' })).toBeVisible();

        const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 2);
        expect(overflow).toBe(false);
    });

    test('tablet 768px layout remains usable and preserves key content on the contact page', async ({ page }) => {
        await page.setViewportSize({ width: 768, height: 1024 });
        await page.goto('/contact-us');

        await expect(page.getByRole('heading', { name: 'Get in touch' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Send Message' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Frequently-Asked Questions' })).toBeVisible();
    });

});
