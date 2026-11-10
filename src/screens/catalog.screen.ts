import { $$ } from '@wdio/globals';
import { BaseScreen } from './base.screen';
import Platform from '@helpers/platform.helper';
import gestures from '@helpers/gesture.helper';

export class CatalogScreen extends BaseScreen {

    // ==================== LOCATORS ====================

    private get productItems() {
        return Platform.isIOS
            ? $$('-ios class chain:**/XCUIElementTypeCell')
            : $$('//androidx.recyclerview.widget.RecyclerView[@resource-id="com.saucelabs.mydemoapp.android:id/productRV"]/android.view.ViewGroup');
    }

    public productTitle(productName: string) {
        return Platform.isIOS
            ? $(`-ios predicate string:label == "${productName}"`)
            : $(`android=new UiSelector().text("${productName}")`);
    }

    private get productTitles() {
        return Platform.isIOS
            ? $$('~Product Name')
            : $$('id=com.saucelabs.mydemoapp.android:id/titleTV');
    }

    private get productPrices() {
        return Platform.isIOS
            ? $$('~Product Price')
            : $$('id=com.saucelabs.mydemoapp.android:id/priceTV');
    }

    // ==================== ACTIONS ====================

    async getProductCount(): Promise<number> {
        return this.productItems.length;
    }

    async getProductTitle(index = 0): Promise<string> {
        return this.productTitles[index].getText();
    }

    async getAllProductTitles(): Promise<string[]> {
        const titles = await this.productTitles;
        return titles.map((title) => title.getText());
    }

    async getProductPrice(index = 0): Promise<string> {
        return this.productPrices[index].getText();
    }

    async getAllProductPrices(): Promise<string[]> {
        const prices = await this.productPrices;
        return prices.map((price) => price.getText());
    }

    async tapProduct(index = 0): Promise<void> {
        const products = await this.productItems;
        await products[index].waitForDisplayed();
        await products[index].click();
    }

    async scrollToProduct(productName: string): Promise<void> {
        await gestures.scrollToElement(
            await this.productTitle(productName)
        );
    }
}

export default new CatalogScreen();