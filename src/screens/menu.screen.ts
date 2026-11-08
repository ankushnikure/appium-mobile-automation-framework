import { $ } from '@wdio/globals';
import { BaseScreen } from './base.screen';
import Platform from '@helpers/platform.helper';

export class MenuScreen extends BaseScreen {
   
    // ==================== LOCATORS ====================

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
        return Platform.isIOS
            ? $('~LogOut-menu-item')
            : $('~Login Menu Item');
    }

    public get logoutMenuItem() {
        return Platform.isIOS
            ? $('~LogOut-menu-item')
            : $('~Logout Menu Item');
    }

   // ==================== ACTIONS ====================

    async tapWebView(): Promise<void> {
        await this.webviewMenuItem.click();
    }

    async tapQrCodeScanner() {
        await this.qrCodeScannerMenuItem.click();
    }

    async tapResetAppState(): Promise<void> {
        await this.resetAppStateMenuItem.click();
    }

    async tapLogin(): Promise<void> {
        await this.loginMenuItem.click();
    }

    async tapLogout(): Promise<void> {
        await this.logoutMenuItem.click();
    }
}

export default new MenuScreen();