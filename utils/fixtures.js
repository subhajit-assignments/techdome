import base from '@playwright/test';
import { ContactFormHelper, collectPageErrors } from './helpers.js';

export const test = base.extend({
    pageErrors: async ({ page }, use) => {
        const pageErrors = collectPageErrors(page);
        await use(pageErrors);
    },

    contactForm: async ({ page }, use) => {
        await use(new ContactFormHelper(page));
    },
});

export { expect } from '@playwright/test';
