import { $ } from '@wdio/globals';

export class LogoutDialog {
    //Locators
    private get confirmLogoutButton() {
        return $('android=new UiSelector().text("LOGOUT")');
    }

     private get cancelLogoutButton() {
        return $('android=new UiSelector().text("CANCEL")');
    }

    // Actions
    async confirmLogout(): Promise<void> {
        await this.confirmLogoutButton.click();
    }

     async cancelLogout(): Promise<void> {
        await this.cancelLogoutButton.click();
    }
}