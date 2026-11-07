import { $ } from '@wdio/globals';
import { BaseScreen } from './base.screen';
import Platform from '@helpers/platform.helper';

export class CartScreen extends BaseScreen {

    // ==================== LOCATORS ====================

    private get noItemsText() {
        return Platform.isIOS
            ? $('~No Items')
            : $('id=com.saucelabs.mydemoapp.android:id/noItemTitleTV');
    }

    private get goShoppingButton() {
        return Platform.isIOS
            ? $('~GoShopping')
            : $('id=com.saucelabs.mydemoapp.android:id/shoppingBt');
    }

    private get cartItem() {
        return Platform.isIOS
            ? $$('-ios class chain:**/XCUIElementTypeCell')
            : $$('id=com.saucelabs.mydemoapp.android:id/titleTV');
    }

    private get removeItemButton() {
        return Platform.isIOS
            ? $$('-ios class chain:**/XCUIElementTypeButton[`name == "Remove Item"`]')
            : $$('~Removes product from cart');
    }

    // ==================== ACTIONS ====================

    async isCartEmpty(): Promise<boolean> {
        return await this.noItemsText.isDisplayed();
    }

    async isContinueShoppingButtonDisplayed(): Promise<boolean> {
        return await this.goShoppingButton.isDisplayed();
    }

    async getCartItemCount(): Promise<number> {
        return await this.cartItem.length;
    }

    async removeItem(index = 0): Promise<void> {
        await this.removeItemButton[index].click();
    }
}

export default new CartScreen();