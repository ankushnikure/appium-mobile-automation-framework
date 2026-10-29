import { $ } from '@wdio/globals';

export class QrCodeScannerScreen {
    //Locators
    public get permissionIcon() {
        return $('id=com.android.permissioncontroller:id/permission_icon');
    }

    public get permissionMessage() {
        return $('id=com.android.permissioncontroller:id/permission_message');
    }

    private get whileUsingTheAppButton() {
        return $('id=com.android.permissioncontroller:id/permission_allow_foreground_only_button');
    }

    private get onlyThisTimeButton() {
        return $('id=com.android.permissioncontroller:id/permission_allow_one_time_button');
    }

    public get dontAllowButton() {
        return $('id=com.android.permissioncontroller:id/permission_deny_button');
    }

    public get previewView() {
        return $('id=com.saucelabs.mydemoapp.android:id/previewView');
    }

    //Actions
    async allowWhileUsingTheApp() {
        await this.whileUsingTheAppButton.click();
    }

    async allowOnlyThisTime() {
        await this.onlyThisTimeButton.click();
    }

    async dontAllow() {
        await this.dontAllowButton.click();
    }
}