class AppStateHelper {
    private readonly androidAppId = 'com.saucelabs.mydemoapp.android';
    private readonly iosBundleId = 'com.saucelabs.mydemo.app.ios';

    async resetApp(): Promise<void> {
        if (browser.isIOS) {
            await browser.execute('mobile: clearApp', {
                bundleId: this.iosBundleId
            });
        } else {
            await browser.execute('mobile: clearApp', {
                appId: this.androidAppId
            });
        }

        if (browser.isIOS) {
            await browser.activateApp(this.iosBundleId);
        } else {
            await browser.activateApp(this.androidAppId);
        }
    }

    async relaunchApp(): Promise<void> {
        await browser.terminateApp(this.androidAppId);
        await browser.activateApp(this.androidAppId);
    }

    async dismissSavePasswordAlert(): Promise<void> {
        if (!browser.isIOS) {
            return;
        }

        try {
            const alert = await browser.getAlertText();

            if (alert.includes('Save Password')) {
                await browser.dismissAlert();
            }
        } catch {
            // No native alert is currently displayed.
        }
    }
}

export default new AppStateHelper();