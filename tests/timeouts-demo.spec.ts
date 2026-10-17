import { NavigationMenu } from '@components/navigation-menu.component';
import { LoginScreen } from '@screens/login.screen';
import { browser, expect } from '@wdio/globals';

const appId = 'com.saucelabs.mydemoapp.android';

describe('Timeout Examples', () => {
    let navigationMenu: NavigationMenu;
    let loginScreen: LoginScreen;

    before(() => {
        navigationMenu = new NavigationMenu();
        loginScreen = new LoginScreen();
    });

    beforeEach(async function () {
        // Allow this setup hook up to 90 seconds
        this.timeout(90000);

        // Clear app data and relaunch
        await browser.execute('mobile: clearApp', { appId });
        await browser.execute('mobile: activateApp', { appId });
    });

    it('Demonstrate wait and assertion timeouts', async function () {

        // Allow this test up to 90 seconds
        this.timeout(90000);

        // Poll a custom condition for up to 20 seconds
        await browser.waitUntil(
            async () => (await browser.getCurrentPackage()) === appId,
            {
                timeout: 20000,
                interval: 500,
                timeoutMsg: 'My Demo App did not become the foreground app'
            }
        );

        // Open the Login screen
        await navigationMenu.openMenu();
        await navigationMenu.selectLogin();

        // Use the default waitforTimeout from wdio.conf.ts
        await loginScreen.loginTitle.waitForDisplayed();

        // Override the explicit wait for this call
        await loginScreen.loginTitle.waitForDisplayed({
            timeout: 15000,
            interval: 500,
            timeoutMsg: 'Login title did not become visible'
        });

        // Override the retrying assertion wait
        await expect(loginScreen.loginTitle).toHaveText('Login', {
            wait: 15000,
            interval: 500
        });
    });
});