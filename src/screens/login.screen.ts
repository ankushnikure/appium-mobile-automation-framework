import { $ } from '@wdio/globals';
import { BaseScreen } from './base.screen';
import Platform from '@helpers/platform.helper';

export class LoginScreen extends BaseScreen {

    constructor() {
        super('LoginScreen');
    }

    // ==================== LOCATORS ====================

    public get loginTitle() {
        return Platform.isIOS
            ? $('-ios class chain:**/XCUIElementTypeStaticText[`name == "Login"`][1]')
            : $('id=com.saucelabs.mydemoapp.android:id/loginTV');
    }

    private get usernameInput() {
        return Platform.isIOS
            ? $('-ios class chain:**/XCUIElementTypeTextField')
            : $('id=com.saucelabs.mydemoapp.android:id/nameET');
    }

    private get passwordInput() {
        return Platform.isIOS
            ? $('-ios class chain:**/XCUIElementTypeSecureTextField')
            : $('id=com.saucelabs.mydemoapp.android:id/passwordET');
    }

    private get loginButton() {
        return Platform.isIOS
            ? $('-ios class chain:**/XCUIElementTypeButton[`name == "Login"`]')
            : $('~Tap to login with given credentials');
    }

    private get usernameErrorMessage() {
        return $('id=com.saucelabs.mydemoapp.android:id/nameErrorTV');
    }

    private get passwordErrorMessage() {
        return $('id=com.saucelabs.mydemoapp.android:id/passwordErrorTV');
    }

    // ==================== ACTIONS ====================

    async enterUsername(username: string) {
        this.log.step(`Entering username: ${username}`);
        await this.usernameInput.setValue(username);
    }

    async enterPassword(password: string) {
        this.log.step('Entering password');
        await this.passwordInput.setValue(password);
    }

    async tapLoginButton() {
        this.log.step('Tapping login button');
        await this.loginButton.click();
    }

    async login(username: string, password: string): Promise<void> {
        this.log.step(`Logging in with user: ${username}`);
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.hideKeyboard();
        await this.tapLoginButton();
    }

    async isErrorMessageDisplayed(): Promise<boolean> {
        return await this.passwordErrorMessage.isDisplayed();
    }

    async getErrorMessage(): Promise<string> {
        return await this.passwordErrorMessage.getText();
    }

    async isUsernameErrorMessageDisplayed(): Promise<boolean> {
        return await this.usernameErrorMessage.isDisplayed();
    }

    async getUsernameErrorMessage(): Promise<string> {
        return this.usernameErrorMessage.getText();
    }
}

export default new LoginScreen(); 