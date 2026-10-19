import { $ } from '@wdio/globals';

export class NavigationMenu {
    // Locators
    public get webviewOption() {
        return $('android=new UiSelector().text("WebView")')
    }

    public get resetAppStateOption() {
        return $('android=new UiSelector().text("Reset App State")')
    }

    public get loginOption() {
        return $('~Login Menu Item');
    }

    public get logoutOption() {
        return $('~Logout Menu Item');
    }

    // Actions
    async selectWebView(): Promise<void> {
        await this.webviewOption.click();
    }

    async selectResetAppState(): Promise<void> {
        await this.resetAppStateOption.click();
    }

    async selectLogin(): Promise<void> {
        await this.loginOption.click();
    }

    async selectLogout(): Promise<void> {
        await this.logoutOption.click();
    }
}