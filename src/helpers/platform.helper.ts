export class Platform {

    static get platform() {
        return browser.capabilities.platformName?.toLowerCase();
    }

    static get isAndroid(): boolean {
        return this.platform === 'android';
    }

    static get isIOS(): boolean {
        return this.platform === 'ios';
    }
}

export default Platform;