import { NavigationMenu } from '@components/navigation-menu.component';
import { LoginScreen } from '@screens/login.screen';
import { browser, expect } from '@wdio/globals';
import loginData from '@test-data/login.data.json'

const appId = 'com.saucelabs.mydemoapp.android';

describe('Login Tests', () => {
    let navigationMenu: NavigationMenu;
    let loginScreen: LoginScreen;

    before(() => {
        navigationMenu = new NavigationMenu();
        loginScreen = new LoginScreen();
    });

    beforeEach(async () => {
        // Clear app data and relaunch before each test
        await browser.execute('mobile: clearApp', { appId });
        await browser.execute('mobile: activateApp', { appId });

        // Confirm the app starts logged out
        await navigationMenu.openMenu();
        await expect(navigationMenu.logoutOption).not.toBeDisplayed();

        // Open the Login screen
        await navigationMenu.selectLogin();
        await expect(loginScreen.loginTitle).toBeDisplayed();
    });

    it('Login with valid credentials', async () => {

        // Login with valid credentials
        await loginScreen.login('bod@example.com', '10203040');

        // Validate the logout option after login
        await navigationMenu.openMenu();
        await expect(navigationMenu.logoutOption).toBeDisplayed();
        await expect(navigationMenu.logoutOption).toHaveText('Log Out');
    });

    it('Login with a locked-out user', async () => {

        // Login with a locked-out user
        await loginScreen.login(
            loginData.lockedOutUser.username,
            loginData.lockedOutUser.password
        );

        // Validate the error message
        await expect(loginScreen.passwordErrorMessage).toBeDisplayed();
        await expect(loginScreen.passwordErrorMessage).toHaveText('Sorry this user has been locked out.');
    });
});