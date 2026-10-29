import { $ } from '@wdio/globals';

export class LoginScreen {
    // Locators
    public get loginTitle() {
        return $('id=com.saucelabs.mydemoapp.android:id/loginTV');
    }

    private get usernameInput() {
        return $('id=com.saucelabs.mydemoapp.android:id/nameET');
    }

    private get passwordInput() {
        return $('id=com.saucelabs.mydemoapp.android:id/passwordET');
    }

    private get loginButton() {
        return $('~Tap to login with given credentials');
    }

    public get usernameErrorMessage() {
        return $('id=com.saucelabs.mydemoapp.android:id/nameErrorTV');
    }

    public get passwordErrorMessage() {
        return $('id=com.saucelabs.mydemoapp.android:id/passwordErrorTV');
    }

    public get errorIcon() {
        return $('~Indicates error');
    }

    // Actions
    async login(username: string, password: string): Promise<void> {
        await this.usernameInput.setValue(username);
        await this.passwordInput.setValue(password);
        await this.loginButton.click();
    }

    async tapPasswordInput(): Promise<void> {
        await this.passwordInput.click();
    }
}