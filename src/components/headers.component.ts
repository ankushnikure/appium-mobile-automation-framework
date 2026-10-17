import { $ } from '@wdio/globals';

export class Header {
    //Locators
    private get menuButton() {
        return $('~View menu');
    }

    public get cartBadge() {
        return $('id=com.saucelabs.mydemoapp.android:id/cartTV');
    }

    //Actions
    async openMenu(): Promise<void> {
        await this.menuButton.click();
    }
}