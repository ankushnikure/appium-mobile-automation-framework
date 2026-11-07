import { $ } from '@wdio/globals';
import { BaseScreen } from './base.screen';

export class LoginScreen extends BaseScreen {
    // Locators
    private get loginTitle() {
        return this.isIOS()
            ? $('-ios class chain:**/XCUIElementTypeStaticText[`name == "Login"`][1]')
            : $('id=com.saucelabs.mydemoapp.android:id/loginTV');
    }

    private get usernameInput() {
        return this.isIOS()
            ? $('-ios class chain:**/XCUIElementTypeTextField')
            : $('id=com.saucelabs.mydemoapp.android:id/nameET');
    }

    private get passwordInput() {
        return this.isIOS()
            ? $('-ios class chain:**/XCUIElementTypeSecureTextField')
            : $('id=com.saucelabs.mydemoapp.android:id/passwordET');
    }

    private get loginButton() {
        return this.isIOS()
            ? $('-ios class chain:**/XCUIElementTypeButton[`name == "Login"`]')
            : $('~Tap to login with given credentials');
    }

    private get usernameErrorMessage() {
        return $('id=com.saucelabs.mydemoapp.android:id/nameErrorTV');
    }

    private get passwordErrorMessage() {
        return $('id=com.saucelabs.mydemoapp.android:id/passwordErrorTV');
    }

    public get errorIcon() {
        return $('~Indicates error');
    }

    // Actions
    async isLoginTitleDisplayed(): Promise<boolean> {
        return await this.loginTitle.isDisplayed();
    }
    
    async login(username: string, password: string): Promise<void> {
        await this.usernameInput.setValue(username);
        await this.passwordInput.setValue(password);
        await this.hideKeyboard();
        await this.loginButton.click();
    }

    async tapPasswordInput(): Promise<void> {
        await this.passwordInput.click();
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