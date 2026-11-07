import { expect } from '@wdio/globals';
import { env } from '@utils/env';
import { Platform } from '@helpers/platform.helper';
import navigation from '@components/navigation.component';
import menuScreen from '@screens/menu.screen';
import loginScreen from '@screens/login.screen';
import loginData from '@test-data/login.data.json'
import appState from '@helpers/app-state.helper';

describe('Login Tests', () => {
    beforeEach(async () => {
        await appState.resetApp();
        await navigation.openMenu();
        await menuScreen.selectLogin();
        expect(await loginScreen.isLoginTitleDisplayed()).toBe(true);
    });

    it('Login with valid credentials', async () => {
        await loginScreen.login(env.username, env.password);
        await navigation.openMenu();
        await expect(menuScreen.logoutMenuItem).toBeDisplayed();
        if (Platform.isAndroid) {
            await expect(menuScreen.logoutMenuItem).toHaveText('Log Out');
        }
    });

    it('Login with a locked-out user', async function (this: Mocha.Context) {
        // Locked-out user validation is not supported on iOS. 
        if (Platform.isIOS) this.skip();

        await loginScreen.login(loginData.lockedOutUser.username, loginData.lockedOutUser.password);
        expect(await loginScreen.isErrorMessageDisplayed()).toBe(true);
        expect(await loginScreen.getErrorMessage()).toBe('Sorry this user has been locked out.');
    });

    it('Show an error when username is empty', async () => {
        await loginScreen.login(loginData.emptyCredentials.username, env.password);
        if (Platform.isIOS) {
            expect(await loginScreen.getAlertText()).toContain('Validation Error!');
            expect(await loginScreen.getAlertText()).toContain('Username is required');
            await loginScreen.acceptAlert();
        } else {
            expect(await loginScreen.isUsernameErrorMessageDisplayed()).toBe(true);
            expect(await loginScreen.getUsernameErrorMessage()).toBe('Username is required');
        }
    });

    it('Show an error when password is empty', async () => {
        await loginScreen.login(env.username, loginData.emptyCredentials.password);
        if (Platform.isIOS) {
            expect(await loginScreen.getAlertText()).toContain('Validation Error!');
            expect(await loginScreen.getAlertText()).toContain('Password is required');
        } else {
            expect(await loginScreen.isErrorMessageDisplayed()).toBe(true);
            expect(await loginScreen.getErrorMessage()).toBe('Enter Password');
        }
    });

    it('Show an error when username & password are empty', async () => {
        await loginScreen.login(loginData.emptyCredentials.username, loginData.emptyCredentials.password);
        if (Platform.isIOS) {
            expect(await loginScreen.getAlertText()).toContain('Validation Error!');
            expect(await loginScreen.getAlertText()).toContain('Username is required');
        } else {
            expect(await loginScreen.isUsernameErrorMessageDisplayed()).toBe(true);
            expect(await loginScreen.getUsernameErrorMessage()).toBe('Username is required');
        }
    });
});