import { $ } from '@wdio/globals';

export class WebViewScreen {
    //Locators
    private get urlInput() {
        return $('id=com.saucelabs.mydemoapp.android:id/urlET');
    }

    private get goToSiteButton() {
        return $('~Tap to view content of given url');
    }

    private get webViewContainer() {
        return $('id=com.saucelabs.mydemoapp.android:id/webView');
    }

    //Actions
    async enterUrl(url: string): Promise<void> {
        await this.urlInput.setValue(url);
    }

    async goToSite(): Promise<void> {
        await this.goToSiteButton.click();
    }

    async waitForWebView(): Promise<void> {
        await this.webViewContainer.waitForDisplayed({
            timeout: 20000,
            timeoutMsg: 'WebView container did not become visible'
        });
    }

    async switchToWebView(): Promise<void> {
        let webViewContext: string | undefined;

        // Wait for a WebView context to become available
        await browser.waitUntil(
            async () => {
                const contexts = await browser.getContexts();

                webViewContext = contexts.find(
                    context =>
                        typeof context === 'string' &&
                        context.startsWith('WEBVIEW')
                ) as string | undefined;

                return webViewContext !== undefined;
            },
            {
                timeout: 20000,
                interval: 500,
                timeoutMsg: 'WebView context did not become available'
            }
        );

        if (!webViewContext) {
            throw new Error('WebView context was not found');
        }

        await browser.switchContext(webViewContext);
    }

    async switchToNative(): Promise<void> {
        await browser.switchContext('NATIVE_APP');
    }
}