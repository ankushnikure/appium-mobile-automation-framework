class AppStateHelper {
    private readonly appId = 'com.saucelabs.mydemoapp.android';

    async resetApp(): Promise<void> {
        await browser.execute('mobile: clearApp', { appId: this.appId, });
        await browser.execute('mobile: activateApp', { appId: this.appId, });
    }

    async relaunchApp(): Promise<void> {
        await browser.terminateApp(this.appId);
        await browser.activateApp(this.appId);
    }
}

export default new AppStateHelper();