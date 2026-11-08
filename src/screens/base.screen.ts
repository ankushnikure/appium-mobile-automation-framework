import { browser } from '@wdio/globals';
import { Platform } from '@helpers/platform.helper';

export class BaseScreen {

    async goBack(): Promise<void> {
        await browser.back();
    }

    async getAlertText(): Promise<string> {
        return await browser.getAlertText();
    }

    async acceptAlert(): Promise<void> {
        await browser.acceptAlert();
    }

    async hideKeyboard(): Promise<void> {
        if (Platform.isIOS) {
            await browser.keys('Enter');
        } else {
            await browser.hideKeyboard();
        }
    }
}