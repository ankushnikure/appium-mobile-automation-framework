import PlatformHelper from '@helpers/platform.helper';

export class BaseScreen {

    isAndroid(): boolean {
        return PlatformHelper.isAndroid;
    }

    isIOS(): boolean {
        return PlatformHelper.isIOS;
    }

    async getAlertText(): Promise<string> {
        return await browser.getAlertText();
    }

    async acceptAlert(): Promise<void> {
        await browser.acceptAlert();
    }

    async hideKeyboard(): Promise<void> {
        if (this.isIOS()) {
            await browser.keys('Enter');
        } else {
            await browser.hideKeyboard();
        }
    }
}