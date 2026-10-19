import { $ } from '@wdio/globals';

export class ResetAppStateDialog {
    //Locators
    public get resetAppStateTitle() {
        return $('id=com.saucelabs.mydemoapp.android:id/alertTitle');
    }
    private get cancelResetAppButton() {
        return $('android=new UiSelector().text("CANCEL")');
    }

    private get confirmResetAppButton() {
        return $('android=new UiSelector().text("RESET APP")');
    }

    public get appHasBeenResetText() {
        return $('android=new UiSelector().text("App State has been reset.")');
    }

    public get okButton() {
        return $('android=new UiSelector().text("OK")');
    }

    //Actions
    async cancelResetApp(): Promise<void> {
        await this.cancelResetAppButton.click();
    }

    async confirmResetApp(): Promise<void> {
        await this.confirmResetAppButton.click();
    }

    public async dismissResetSuccessMessage(): Promise<void> {
        await this.okButton.click();
    }
}