import { $ } from '@wdio/globals';
import { BaseScreen } from './base.screen';
// import { GestureHelper } from '@helpers/gesture.helper';
import Platform from '@helpers/platform.helper';

export class CatalogScreen extends BaseScreen {

    // private readonly gestures = new GestureHelper();

    // ==================== LOCATORS ====================

    public get cartBadge() {
        return $('id=com.saucelabs.mydemoapp.android:id/cartTV');
    }

    public get screenTitle() {
        return $('~title');
    }

    // private get productScrollContainer() {
    //     return $('id=com.saucelabs.mydemoapp.android:id/scrollView');
    // }

    public get productItems() {
        return Platform.isIOS
            ? $$('-ios class chain:**/XCUIElementTypeCell')
            : $$('id=com.saucelabs.mydemoapp.android:id/productIV');
    }

    public productTitle(productName: string) {
        return $(
            'android=new UiSelector()' +
            '.resourceId("com.saucelabs.mydemoapp.android:id/titleTV")' +
            `.text(${JSON.stringify(productName)})`
        );
    }

    public productImage(productName: string) {
        return $(
            '//android.widget.TextView' +
            '[@resource-id="com.saucelabs.mydemoapp.android:id/titleTV"]' +
            `[@text="${productName}"]` +
            '/../android.widget.ImageView' +
            '[@resource-id="com.saucelabs.mydemoapp.android:id/productIV"]'
        );
    }

    // ==================== ACTIONS ====================

    // async openProduct(productName: string): Promise<void> {
    //     await this.productImage(productName).click();
    // }

    async openProduct(index = 0): Promise<void> {
        await this.productItems[index].click();
    }
}

export default new CatalogScreen();