import { $ } from '@wdio/globals';
import { BaseScreen } from '@screens/base.screen';
import Platform from '@helpers/platform.helper';

export class NavigationComponent extends BaseScreen {

    // ==================== LOCATORS ====================

    private get menuIcon() {
        return Platform.isIOS
            ? $('~More-tab-item')
            : $('~View menu');
    }

    private get cartIcon() {
        return Platform.isIOS
            ? $('~Cart-tab-item')
            : $('~View cart');
    }

    private get cartBadge() {
        return $('id=com.saucelabs.mydemoapp.android:id/cartTV');
    }

    // ==================== ACTIONS ====================

    async openMenu(): Promise<void> {
        await this.menuIcon.click();
    }

    async openCart(): Promise<void> {
        await this.cartIcon.click();
    }

    async getCartBadgeCount(): Promise<number> {
        return Number(await this.cartBadge.getText());
    }
}

export default new NavigationComponent();