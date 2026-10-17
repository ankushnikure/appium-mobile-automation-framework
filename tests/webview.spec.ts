import { NavigationMenu } from '@components/navigation-menu.component';
import { WebViewScreen } from '@screens/webview.screen';
import { browser, expect } from '@wdio/globals';


describe('Webview Tests', () => {
    let navigationMenu: NavigationMenu;
    let webViewScreen: WebViewScreen;

    beforeEach(async () => {
        navigationMenu = new NavigationMenu();
        webViewScreen = new WebViewScreen();

        // Open the WebView screen
        await navigationMenu.openMenu();
        await navigationMenu.selectWebView();
    });

    it('Open the website inside the WebView', async () => {

        // Enter the URL and open the website
        await webViewScreen.enterUrl('https://shop.azaonline.in');
        await webViewScreen.goToSite();
        await webViewScreen.waitForWebView();

        try {
            // Switch to webpage
            await webViewScreen.switchToWebView();

            // Validate the expected website URL
            await expect(browser).toHaveUrl(/^https:\/\/shop\.azaonline\.in(?:\/|$)/);

            console.log('Webpage title:', await browser.getTitle());
        } finally {
            // Return to native app automation
            await webViewScreen.switchToNative();

            // Validate the active context
            expect(await browser.getContext()).toBe('NATIVE_APP');
        }
    });
})