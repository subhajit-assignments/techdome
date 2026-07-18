import { test, expect } from '@playwright/test';

test.describe.serial('Navigation', () => {
    test('navigation links resolve to confirmed internal pages', async ({ page }) => {
        await page.goto('/', { waitUntil: 'load' });

        const navChecks = [
            { name: 'About Us', path: '/about-us', header: 'Discovery Awaits' },
            { name: 'Careers', path: '/careers', header: 'Careers at Techdome' },
            { name: 'Contact Us', path: '/contact-us', header: 'Get in touch' },
        ];

        for (const item of navChecks) {
            await page.goto('/', { waitUntil: 'load' });

            await page.getByRole('banner').getByRole('link', {
                name: item.name,
                exact: true,
            }).click();

            const heading = page.locator('h1').first();
            await heading.waitFor({ state: 'visible' });
            await expect(heading).toHaveText(item.header);
        }
    });

    test('expertise and industries menus expose real child destinations', async ({ page }) => {
        await page.goto('/', { waitUntil: 'load' });

        await page.getByRole('link', { name: 'Expertise', exact: true }).hover();

        const aiLink = page.getByRole('link', {
            name: 'Artificial Intelligence',
            exact: true,
        }).first();

        await aiLink.waitFor({ state: 'visible' });
        await aiLink.click();

        await expect(page).toHaveURL(/AI-solutions/);

        await page.goto('/', { waitUntil: 'load' });

        await page.getByRole('link', { name: 'Industries', exact: true }).hover();

        const healthcareLink = page.getByRole('link', {
            name: 'Healthcare',
            exact: true,
        }).first();

        await healthcareLink.waitFor({ state: 'visible' });
        await healthcareLink.click();

        await expect(page).toHaveURL(/health-industry/);
    });
});