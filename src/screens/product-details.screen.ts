import { $ } from '@wdio/globals';
import { BaseScreen } from './base.screen';
import Platform from '@helpers/platform.helper';

export class ProductDetailsScreen extends BaseScreen {

    // ==================== LOCATORS ====================
    public get addToCartButton() {
        return Platform.isIOS
            ? $('~AddToCart')
            : $('~Tap to add product to cart');
    }

    // ==================== ACTIONS ====================

    async addProductToCart(): Promise<void> {
        await this.addToCartButton.click();
    }
}

export default new ProductDetailsScreen();