import { browser, expect } from '@wdio/globals';

describe('App Launch Tests', () => {
    it('Display My Demo App in the foreground', async () => {
        const platformName = browser.capabilities.platformName;

        if (platformName === 'Android') {
            const currentPackage = await browser.getCurrentPackage();
            expect(currentPackage).toBe('com.saucelabs.mydemoapp.android');
        } else if (platformName === 'iOS') {
            const currentBundleId = await browser.execute('mobile: activeAppInfo') as { bundleId: string; };
            expect(currentBundleId.bundleId).toBe('com.saucelabs.mydemo.app.ios');
        }
    });
});