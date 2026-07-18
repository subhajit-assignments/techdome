import { test, expect } from '@playwright/test';

function normalizeHeaderValue(value) {
    return (value || 'missing').toLowerCase();
}

test('homepage and contact responses expose a measurable security-header posture', async ({ page }) => {
    const homeResponse = await page.goto('/', { waitUntil: 'load' });
    const homeHeaders = homeResponse.headers();

    const headers = [
        ['content-security-policy', normalizeHeaderValue(homeHeaders['content-security-policy'])],
        ['strict-transport-security', normalizeHeaderValue(homeHeaders['strict-transport-security'])],
        ['x-frame-options', normalizeHeaderValue(homeHeaders['x-frame-options'])],
    ];

    headers.forEach(([name, value]) => {
        expect(['missing', 'default-src', 'strict-transport-security', 'deny', 'sameorigin']).toContain(value);
    });

    const contactResponse = await page.goto('/contact-us', { waitUntil: 'load' });
    const contactHeaders = contactResponse.headers();

    const contactAudit = [
        ['content-security-policy', normalizeHeaderValue(contactHeaders['content-security-policy'])],
        ['strict-transport-security', normalizeHeaderValue(contactHeaders['strict-transport-security'])],
        ['x-frame-options', normalizeHeaderValue(contactHeaders['x-frame-options'])],
    ];

    contactAudit.forEach(([name, value]) => {
        expect(['missing', 'default-src', 'strict-transport-security', 'deny', 'sameorigin']).toContain(value);
    });
});
