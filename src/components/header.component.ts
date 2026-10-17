import { $ } from '@wdio/globals';

export class Header {
    //Locators
    private get menuButton() {
        return $('~View menu');
    }

    private get cartIcon() {
        return $('~View cart');
    }

    public get cartBadge() {
        return $('id=com.saucelabs.mydemoapp.android:id/cartTV');
    }

    //Actions
    async openMenu(): Promise<void> {
        await this.menuButton.click();
    }

    async openCart(): Promise<void> {
        await this.cartIcon.click();
    }
}