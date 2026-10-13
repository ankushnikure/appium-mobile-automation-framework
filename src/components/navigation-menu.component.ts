import { $ } from '@wdio/globals';

export class NavigationMenu {

    get menuButton() {
        return $('~View menu');
    }

    get loginOption() {
        return $('~Login Menu Item');
    }

    async openMenu(): Promise<void> {
        await this.menuButton.click();
    }

    async selectLogin(): Promise<void> {
        await this.loginOption.click();
    }
}