import { expect } from '@wdio/globals';
import { env } from '@utils/env'
import appState from '@helpers/app-state.helper';
import navigation from '@components/navigation.component';
import menuScreen from '@screens/menu.screen';
import loginScreen from '@screens/login.screen';
import logoutDialog from '@components/logout-dialog.component';
import Platform from '@helpers/platform.helper';

describe('Logout', () => {
    beforeEach(async () => {
        await appState.resetApp();
        await navigation.openMenu();
        await menuScreen.tapLogin();
        await loginScreen.login(env.username, env.password);
        await navigation.openMenu();
        await expect(menuScreen.logoutMenuItem).toBeDisplayed();
    });

    it('should log out when confirmation is accepted', async () => {
        await menuScreen.tapLogout();
        if (Platform.isIOS) {
            // Logout dialog is not available on iOS. 
            await expect(loginScreen.loginTitle).toBeDisplayed();
        } else {
            await logoutDialog.confirmLogout();
            await navigation.openMenu();
            await expect(menuScreen.loginMenuItem).toBeDisplayed();
            await expect(menuScreen.loginMenuItem).toHaveText('Log In');
            await expect(menuScreen.logoutMenuItem).not.toBeDisplayed();
        }
    });

    it('should remain logged in when logout is cancelled', async function () {
        // Logout dialog is not available on iOS. 
        if (Platform.isIOS) this.skip();

        await menuScreen.tapLogout();
        await logoutDialog.cancelLogout();
        await navigation.openMenu();
        await expect(menuScreen.logoutMenuItem).toBeDisplayed();
        await expect(menuScreen.logoutMenuItem).toHaveText('Log Out');
    });
});