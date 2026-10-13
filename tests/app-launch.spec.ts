import { browser, expect } from '@wdio/globals';

describe('App Launch Tests', async() => {
    it('Launch My Demo App', async () => {
        const currentPackage = await browser.getCurrentPackage();
        expect(currentPackage).toBe('com.saucelabs.mydemoapp.android');
    })
})