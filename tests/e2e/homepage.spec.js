import { test, expect } from '@playwright/test';

test('homepage loads with correct title, meta description, and hero content', async ({ page }) => {
    await page.goto('/', { waitUntil: 'load' });
    await expect(page).toHaveTitle(/Techdome - Consultancy \| IT Solutions \| Digitization/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /TechDome|one-stop-shop|solutions/);
    await expect(page.getByRole('heading', { name: 'Trusted Partner in Digital Excellence' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Meet the Minds' })).toHaveAttribute('href', /about-us/);
});