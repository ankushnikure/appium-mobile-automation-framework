import { $ } from '@wdio/globals';

export class NavigationMenu {
    // Locators
    private get menuButton() {
        return $('~View menu');
    }

    public get webviewOption() {
        return $(`android=new UiSelector().text("WebView")`)
    }

    public get loginOption() {
        return $('~Login Menu Item');
    }

    public get logoutOption() {
        return $('~Logout Menu Item');
    }

    // Actions
    async openMenu(): Promise<void> {
        await this.menuButton.click();
    }

    async selectWebView(): Promise<void> {
        await this.webviewOption.click();
    }

    async selectLogin(): Promise<void> {
        await this.loginOption.click();
    }

    async selectLogout(): Promise<void> {
        await this.logoutOption.click();
    }
}