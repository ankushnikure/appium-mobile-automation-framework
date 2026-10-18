import { $ } from '@wdio/globals';

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
    async scroll(direction: 'up' | 'down' | 'left' | 'right'): Promise<boolean> {
        const scrollContainer = await this.productScrollContainer;

        return driver.execute('mobile: scrollGesture', {
            elementId: scrollContainer.elementId,
            direction,
            percent: 0.75,
        });
    }

    async scrollToProduct(productName: string): Promise<void> {
        const maxScrolls = 10;

        for (let attempt = 0; attempt < maxScrolls; attempt++) {
            if (await this.productTitle(productName).isDisplayed()) {
                return;
            }

            if (!await this.scroll('down')) {
                break;
            }
        }

        if (await this.productTitle(productName).isDisplayed()) {
            return;
        }

        throw new Error(`Product "${productName}" was not visible after scrolling`);
    }

    async swipe(direction: 'up' | 'down' | 'left' | 'right'): Promise<void> {
        const scrollContainer = await this.productScrollContainer;

        await driver.execute('mobile: swipeGesture', {
            elementId: scrollContainer.elementId,
            direction,
            percent: 0.075,
        });
    }

    async swipeToProduct(productName: string): Promise<void> {
        const maxSwipes = 10;

        for (let attempt = 0; attempt < maxSwipes; attempt++) {
            if (await this.productTitle(productName).isDisplayed()) {
                return;
            }

            await this.swipe('up');
        }

        if (await this.productTitle(productName).isDisplayed()) {
            return;
        }

        throw new Error(`Product "${productName}" was not visible after swiping`)
    }

    async longPress(element: WebdriverIO.Element): Promise<void> {
        await driver.execute('mobile: longClickGesture', {
            elementId: element.elementId,
            duration: 2000
        })
    }

    async openProduct(productName: string): Promise<void> {
        await this.productImage(productName).click();
    }
}