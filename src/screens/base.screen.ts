import { browser } from '@wdio/globals';
import { Platform } from '@helpers/platform.helper';
import { Logger } from '@utils/logger';

export class BaseScreen {
    protected log: Logger;

    constructor(screenName: string) {
        this.log = new Logger(screenName);
    }

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