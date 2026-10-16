import { NavigationMenu } from '@components/navigation-menu.component';
import { LoginScreen } from '@screens/login.screen';
import { expect } from '@wdio/globals';
import { env } from '@utils/env'
import { LogoutDialog } from '@components/logout-dialog.component';

const appId = 'com.saucelabs.mydemoapp.android';

describe('Logout Tests', () => {
    let navigationMenu: NavigationMenu;
    let loginScreen: LoginScreen;
    let logoutDialog: LogoutDialog;

    before(async () => {
        navigationMenu = new NavigationMenu();
        loginScreen = new LoginScreen();
        logoutDialog = new LogoutDialog();
    });

    beforeEach(async () => {
        // Clear app data and relaunch before each test
        await browser.execute('mobile: clearApp', { appId });
        await browser.execute('mobile: activateApp', { appId });

        // Login before testing logout behavior
        await navigationMenu.openMenu();
        await navigationMenu.selectLogin();
        await loginScreen.login(env.username, env.password);
    });

    it('Logout when confirmation is accepted', async () => {

        // Open the logout confirmation dialog
        await navigationMenu.openMenu();
        await navigationMenu.selectLogout();

        // Confirm logout
        await logoutDialog.confirmLogout();

        // Validate the logged-out menu state
        await navigationMenu.openMenu();
        await expect(navigationMenu.loginOption).toBeDisplayed();
        await expect(navigationMenu.loginOption).toHaveText('Log In');
        await expect(navigationMenu.logoutOption).not.toBeDisplayed();
    });

    it('Remain logged in when logout is cancelled', async () => {

        // Open the logout confirmation dialog
        await navigationMenu.openMenu();
        await navigationMenu.selectLogout();

        // Cancel logout
        await logoutDialog.cancelLogout();

        // Validate the logged-in menu state
        await navigationMenu.openMenu();
        await expect(navigationMenu.logoutOption).toBeDisplayed();
        await expect(navigationMenu.logoutOption).toHaveText('Log Out');
    });
});