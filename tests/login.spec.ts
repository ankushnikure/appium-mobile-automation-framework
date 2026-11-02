import { Header } from '@components/header.component';
import { NavigationMenu } from '@components/navigation-menu.component';
import { LoginScreen } from '@screens/login.screen';
import { browser, expect } from '@wdio/globals';
import { env } from '@utils/env';
import loginData from '@test-data/login.data.json'
import { KeyboardHelper } from '@helpers/keyboard.helper';
import appStateHelper from '@helpers/app-state.helper';

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
        await appStateHelper.resetApp();
        await header.openMenu();
        await expect(navigationMenu.logoutOption).not.toBeDisplayed();
        await navigationMenu.selectLogin();
        await expect(loginScreen.loginTitle).toBeDisplayed();
    });

    it('Login with valid credentials', async () => {
        await loginScreen.login(env.username, env.password);
        await header.openMenu();
        await expect(navigationMenu.logoutOption).toBeDisplayed();
        await expect(navigationMenu.logoutOption).toHaveText('Log Out');
    });

    it('Login with a locked-out user', async () => {
        await loginScreen.login(loginData.lockedOutUser.username, loginData.lockedOutUser.password);
        await expect(loginScreen.passwordErrorMessage).toBeDisplayed();
        await expect(loginScreen.passwordErrorMessage).toHaveText('Sorry this user has been locked out.');
    });

    it('Show an error when username is empty', async () => {
        await loginScreen.login(loginData.emptyCredentials.username, env.password);
        await expect(loginScreen.usernameErrorMessage).toBeDisplayed();
        await expect(loginScreen.usernameErrorMessage).toHaveText('Username is required');
    });

    it('Show an error when password is empty', async () => {
        await loginScreen.login(env.username, loginData.emptyCredentials.password);
        await expect(loginScreen.passwordErrorMessage).toBeDisplayed();
        await expect(loginScreen.passwordErrorMessage).toHaveText('Enter Password');
    });

    it('Show an error when username & password are empty', async () => {
        await loginScreen.login(loginData.emptyCredentials.username, loginData.emptyCredentials.password);
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