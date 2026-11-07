import { BaseScreen } from '@screens/base.screen';
import { $ } from '@wdio/globals';

export class NavigationComponent extends BaseScreen {
    // Locators
    private get menuIcon() {
        return this.isIOS()
            ? $('~More-tab-item')
            : $('~View menu');
    }

    private get cartIcon() {
        return $('~View cart');
    }

    // Actions
    async openMenu(): Promise<void> {
        await this.menuIcon.click();
    }

    async openCart(): Promise<void> {
        await this.cartIcon.click();
    }
}

export default new NavigationComponent();