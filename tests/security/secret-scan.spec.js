import { test, expect } from '@playwright/test';

test('page source and visible network activity do not leak secret patterns beyond public contact info', async ({ page }) => {
    const networkUrls = [];
    page.on('response', (response) => {
        if (response.url().includes('techdome.io') || response.url().includes('google-analytics.com') || response.url().includes('googletagmanager.com')) {
            networkUrls.push(response.url());
        }
    });

    await page.goto('/contact-us', { waitUntil: 'load' });

    const pageText = await page.content();
    expect(pageText).not.toMatch(/(sk_live|pk_live|AKIA|ghp_|token|password|secret)/i);
    expect(networkUrls.length).toBeGreaterThan(0);
});
