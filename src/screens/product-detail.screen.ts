import { $ } from '@wdio/globals';
import { BaseScreen } from './base.screen';
import Platform from '@helpers/platform.helper';

export class ProductDetailScreen extends BaseScreen {

    constructor() {
        super('ProductDetailScreen');
    }

    // ==================== LOCATORS ====================

    private get backButtonIcon() {
        return Platform.isIOS
            ? $('~BackButton Icons')
            : undefined;
    }
    private get productTitle() {
        return Platform.isIOS
            ? $('-ios class chain:**/XCUIElementTypeScrollView/XCUIElementTypeOther/XCUIElementTypeStaticText[1]')
            : $('id=com.saucelabs.mydemoapp.android:id/productTV');
    }

    private get productPrice() {
        return Platform.isIOS
            ? $('~Price')
            : $('id=com.saucelabs.mydemoapp.android:id/priceTV');
    }

    private get addToCartButton() {
        return Platform.isIOS
            ? $('~AddToCart')
            : $('~Tap to add product to cart');
    }

    private get addPlusIcon() {
        return Platform.isIOS
            ? $('~AddPlus Icons')
            : $('~Increase item quantity')
    }

    // ==================== ACTIONS ====================

    async tapBackButton(): Promise<void> {
        this.log.step('Navigating back from product detail');
        await this.backButtonIcon?.click();
    }

    async navigateBackToCatalog(): Promise<void> {
        if (Platform.isIOS) {
            await this.tapBackButton();
        } else {
            await this.goBack();
        }
    }

    async getProductTitle(): Promise<string> {
        return this.productTitle.getText();
    }

    async getProductPrice(): Promise<string> {
        return this.productPrice.getText();
    }

    async increaseItemQuantity(times = 1): Promise<void> {
        for (let i = 0; i < times; i++) {
            this.log.step(`Incrementing quantity (${i + 1}/${times})`);
            await this.addPlusIcon.click();
        }
    }

    async addProductToCart(): Promise<void> {
        this.log.step('Adding product to cart from detail page');
        await this.addToCartButton.click();
    }
}

export default new ProductDetailScreen();