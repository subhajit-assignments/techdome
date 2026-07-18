import { expect } from '@playwright/test';

const defaultContactPayload = {
    company: 'Acme',
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    phone: '1234567890',
    message: 'Hello from automated verification.',
};

export function buildContactPayload(overrides = {}) {
    return {
        ...defaultContactPayload,
        ...overrides,
    };
}

export function collectPageErrors(page) {
    const pageErrors = [];

    page.on('pageerror', (error) => {
        pageErrors.push(error.message);
    });

    return pageErrors;
}

export class ContactFormHelper {
    constructor(page) {
        this.page = page;
    }

    async open() {
        await this.page.goto('/contact-us', { waitUntil: 'load' });
        return this;
    }

    async fillSubmission(overrides = {}) {
        const payload = buildContactPayload(overrides);

        await this.page.getByLabel('Company *').fill(payload.company);
        await this.page.getByLabel('First Name *').fill(payload.firstName);
        await this.page.getByLabel('Last Name *').fill(payload.lastName);
        await this.page.getByLabel('Email *').fill(payload.email);
        await this.page.getByLabel('Phone Number').fill(payload.phone);
        await this.page.getByLabel('Message').fill(payload.message);

        return payload;
    }

    async submit() {
        await this.page.getByRole('button', { name: 'Send Message' }).click();
        return this;
    }

    async expectSuccessMessage() {
        await expect(
            this.page.getByText(/Thank you for reaching out! We will get back to you shortly./i)
        ).toBeVisible();
    }
}
