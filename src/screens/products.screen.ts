import { $ } from '@wdio/globals';
import { GestureHelper } from '@helpers/gesture.helper';
export class ProductsScreen {

    private readonly gestures = new GestureHelper();

    //Locators
    private get productScrollContainer() {
        return $('id=com.saucelabs.mydemoapp.android:id/scrollView');
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

    //Actions
    async openProduct(productName: string): Promise<void> {
        await this.productImage(productName).click();
    }

    async scrollToProduct(productName: string): Promise<void> {
        const maxScrolls = 10;
        const targetProduct = this.productTitle(productName);
        const scrollContainer = await this.productScrollContainer;

        for (let attempt = 0; attempt < maxScrolls; attempt++) {
            if (await targetProduct.isDisplayed()) {
                return;
            }

            const canScrollMore = await this.gestures.scroll(scrollContainer, 'down');

            if (!canScrollMore) {
                break;
            }
        }

        if (await targetProduct.isDisplayed()) {
            return;
        }

        throw new Error(`Product "${productName}" was not visible after scrolling`);
    }

    async swipeToProduct(productName: string): Promise<void> {
        const maxSwipes = 10;
        const targetProduct = this.productTitle(productName);
        const scrollContainer = await this.productScrollContainer;

        for (let attempt = 0; attempt < maxSwipes; attempt++) {
            if (await targetProduct.isDisplayed()) {
                return;
            }

            await this.gestures.swipe(scrollContainer, 'up');
        }

        if (await targetProduct.isDisplayed()) {
            return;
        }

        throw new Error(`Product "${productName}" was not visible after swiping`);
    }

    async longPress(element: WebdriverIO.Element): Promise<void> {
        await this.gestures.longPress(element);
    }
}