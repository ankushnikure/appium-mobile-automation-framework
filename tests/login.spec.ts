import { Header } from '@components/header.component';
import { NavigationMenu } from '@components/navigation-menu.component';
import { LoginScreen } from '@screens/login.screen';
import { browser, expect } from '@wdio/globals';
import { env } from '@utils/env';
import loginData from '@test-data/login.data.json'
import { KeyboardHelper } from '@helpers/keyboard.helper';

const appId = 'com.saucelabs.mydemoapp.android';

describe('Login Tests', () => {
    let header: Header;
    let navigationMenu: NavigationMenu;
    let loginScreen: LoginScreen;
    let keyboardHelper: KeyboardHelper;

    before(() => {
        header = new Header();
        navigationMenu = new NavigationMenu();
        loginScreen = new LoginScreen();
        keyboardHelper = new KeyboardHelper();
    });

    beforeEach(async () => {
        // Clear app data and relaunch before each test
        await browser.execute('mobile: clearApp', { appId });
        await browser.execute('mobile: activateApp', { appId });

        // Confirm the app starts logged out
        await header.openMenu();
        await expect(navigationMenu.logoutOption).not.toBeDisplayed();

        // Open the Login screen
        await navigationMenu.selectLogin();
        await expect(loginScreen.loginTitle).toBeDisplayed();
    });

    it('Login with valid credentials', async () => {
        // Login with valid credentials
        await loginScreen.login(env.username, env.password);

        // Validate the logout option after login
        await header.openMenu();
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

    it('Show an error when username is empty', async () => {
        // Submit with an empty username and a valid password
        await loginScreen.login(
            loginData.emptyCredentials.username,
            env.password
        );

        // Validate the username error
        await expect(loginScreen.usernameErrorMessage).toBeDisplayed();
        await expect(loginScreen.usernameErrorMessage).toHaveText('Username is required');
    });

    it('Show an error when password is empty', async () => {
        // Submit with a valid username and an empty password
        await loginScreen.login(
            env.username,
            loginData.emptyCredentials.password
        );

        // Validate the password error
        await expect(loginScreen.passwordErrorMessage).toBeDisplayed();
        await expect(loginScreen.passwordErrorMessage).toHaveText('Enter Password');
    });

    it('Show an error when username & password are empty', async () => {
        // Submit with an empty username and a valid password
        await loginScreen.login(
            loginData.emptyCredentials.username,
            loginData.emptyCredentials.password
        );

        // Validate the username error
        await expect(loginScreen.usernameErrorMessage).toBeDisplayed();
        await expect(loginScreen.usernameErrorMessage).toHaveText('Username is required');
    });

    it('Display and hide the keyboard', async () => {
        await loginScreen.tapPasswordInput();
        expect(await browser.isKeyboardShown()).toBe(true);

        await keyboardHelper.hideKeyboard();
        expect(await browser.isKeyboardShown()).toBe(false);
    });
});