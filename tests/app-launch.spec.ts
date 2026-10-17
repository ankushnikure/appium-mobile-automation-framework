import { browser, expect } from '@wdio/globals';

describe('App Launch Tests', () => {
    it('Display My Demo App in the foreground', async () => {
        // Get the package name of the foreground Android app
        const currentPackage = await browser.getCurrentPackage();

        // Confirm that My Demo App is in the foreground
        expect(currentPackage).toBe('com.saucelabs.mydemoapp.android');
    });
});