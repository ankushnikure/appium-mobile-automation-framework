import { expect } from '@wdio/globals';
import { env } from '@utils/env';
import { Platform } from '@helpers/platform.helper';
import navigation from '@components/navigation.component';
import menuScreen from '@screens/menu.screen';
import loginScreen from '@screens/login.screen';
import loginData from '@test-data/login.data.json'
import appState from '@helpers/app-state.helper';
import { Logger } from '@utils/logger';

const log = new Logger('Login Test');

describe('Login', () => {
    beforeEach(async () => {
        await appState.resetApp();
        await navigation.openMenu();
        await menuScreen.tapLogin();
        await expect(loginScreen.loginTitle).toBeDisplayed();
    });

    describe('Successful Login', () => {
        it.only('should log in with valid credentials', async () => {
            await loginScreen.login(env.username, env.password);
            await navigation.openMenu();
            await expect(menuScreen.logoutMenuItem).toBeDisplayed();
            if (Platform.isAndroid) {
                await expect(menuScreen.logoutMenuItem).toHaveText('Log Out');
            }
        });
    });

    describe('Login Errors', () => {
        it.only('should display error for locked-out user', async function () {
            // Locked-out user validation is not supported on iOS. 
            if (Platform.isIOS) {
                log.info('Skipping locked-out user validation on iOS.');
                this.skip();
            }

            await loginScreen.login(loginData.lockedOutUser.username, loginData.lockedOutUser.password);
            expect(await loginScreen.isErrorMessageDisplayed()).toBe(true);
            expect(await loginScreen.getErrorMessage()).toBe('Sorry this user has been locked out.');
        });

        it('should display error when username is missing', async () => {
            await loginScreen.login(loginData.emptyCredentials.username, env.password);
            if (Platform.isIOS) {
                const alertText = await loginScreen.getAlertText();
                expect(alertText).toContain('Validation Error!');
                expect(alertText).toContain('Username is required');
                await loginScreen.acceptAlert();
            } else {
                expect(await loginScreen.isUsernameErrorMessageDisplayed()).toBe(true);
                expect(await loginScreen.getUsernameErrorMessage()).toBe('Username is required');
            }
        });

        it('should display error when password is missing', async () => {
            await loginScreen.login(env.username, loginData.emptyCredentials.password);
            if (Platform.isIOS) {
                expect(await loginScreen.getAlertText()).toContain('Validation Error!');
                expect(await loginScreen.getAlertText()).toContain('Password is required');
            } else {
                expect(await loginScreen.isErrorMessageDisplayed()).toBe(true);
                expect(await loginScreen.getErrorMessage()).toBe('Enter Password');
            }
        });

        it('should display error when credentials are empty', async () => {
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
});