import { test, expect } from '@playwright/test';

test('contact page render triggers a successful analytics request during page-view tracking', async ({ page }) => {
    const requests = [];

    page.on('request', (request) => {
        if (request.url().includes('google-analytics.com') || request.url().includes('googletagmanager.com')) {
            requests.push({ method: request.method(), url: request.url() });
        }
    });

    const response = await page.goto('/contact-us');
    await page.waitForLoadState('networkidle');

    expect(response?.status()).toBe(200);
    expect(requests.length).toBeGreaterThan(0);
});

test('visible page and analytics endpoints return successful responses during the contact page render', async ({ page }) => {
    const responses = [];
    page.on('response', (response) => {
        if (response.url().includes('techdome.io') || response.url().includes('googletagmanager.com') || response.url().includes('google-analytics.com')) {
            responses.push({ status: response.status(), url: response.url() });
        }
    });

    const response = await page.goto('/contact-us');
    await page.waitForLoadState('networkidle');

    expect(response?.status()).toBe(200);
    expect(responses.some((item) => item.status === 200)).toBeTruthy();
});
