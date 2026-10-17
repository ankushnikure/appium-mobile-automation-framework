import { $, browser } from '@wdio/globals';

export class ProductsScreen {
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
    async scrollDown(): Promise<boolean> {
        const container = await this.productScrollContainer;

        return browser.execute('mobile: scrollGesture', {
            elementId: container.elementId,
            direction: 'down',
            percent: 0.75
        });
    }

    async scrollToProduct(productName: string, maxScrolls: number = 10): Promise<void> {
        for (let attempt = 0; attempt <= maxScrolls; attempt++) {
            if (await this.productTitle(productName).isDisplayed()) {
                return;
            }

            if (attempt === maxScrolls) {
                break;
            }

            await this.scrollDown();
        }

        throw new Error(`Product "${productName}" was not visible after scrolling`);
    }

    async openProduct(productName: string): Promise<void> {
        await this.productImage(productName).click();
    }
}