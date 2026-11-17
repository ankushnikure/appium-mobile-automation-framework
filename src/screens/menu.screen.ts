import { $ } from '@wdio/globals';
import { BaseScreen } from './base.screen';
import Platform from '@helpers/platform.helper';

export class MenuScreen extends BaseScreen {

    constructor() {
        super('MenuScreen');
    }

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
        this.log.step('Navigating to Webview');
        await this.webviewMenuItem.click();
    }

    async tapQrCodeScanner() {
        this.log.step('Navigating to QrCodeScanner');
        await this.qrCodeScannerMenuItem.click();
    }

    async tapResetAppState(): Promise<void> {
        this.log.step('Navigating to ResetAppState');
        await this.resetAppStateMenuItem.click();
    }

    async tapLogin(): Promise<void> {
        this.log.step('Navigating to Login');
        await this.loginMenuItem.click();
    }

    async tapLogout(): Promise<void> {
        this.log.step('Logging out');
        await this.logoutMenuItem.click();
    }
}

export default new MenuScreen();