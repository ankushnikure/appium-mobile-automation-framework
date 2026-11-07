import { $ } from '@wdio/globals';
import { BaseScreen } from './base.screen';

export class MenuScreen extends BaseScreen {
    // Locators
    public get webviewMenuItem() {
        return $('android=new UiSelector().text("WebView")');
    }

    public get qrCodeScannerMenuItem() {
        return $('android=new UiSelector().text("QR Code Scanner")');
    }

    public get resetAppStateMenuItem() {
        return $('android=new UiSelector().text("Reset App State")');
    }

    public get loginMenuItem() {
        return this.isIOS()
            ? $('~LogOut-menu-item')
            : $('~Login Menu Item');
    }

    public get logoutMenuItem() {
        return this.isIOS()
            ? $('~LogOut-menu-item')
            : $('~Logout Menu Item');
    }

    // Actions
    async selectWebView(): Promise<void> {
        await this.webviewMenuItem.click();
    }

    async selectQrCodeScanner() {
        await this.qrCodeScannerMenuItem.click();
    }

    async selectResetAppState(): Promise<void> {
        await this.resetAppStateMenuItem.click();
    }

    async selectLogin(): Promise<void> {
        await this.loginMenuItem.click();
    }

    async selectLogout(): Promise<void> {
        await this.logoutMenuItem.click();
    }
}

export default new MenuScreen();