import { Header } from '@components/header.component';
import { NavigationMenu } from '@components/navigation.component';
import { LoginScreen } from '@screens/login.screen';
import { expect } from '@wdio/globals';
import { env } from '@utils/env'
import { LogoutDialog } from '@components/logout-dialog.component';
import appStateHelper from '@helpers/app-state.helper';

describe('Logout Tests', () => {
    let header: Header;
    let navigationMenu: NavigationMenu;
    let loginScreen: LoginScreen;
    let logoutDialog: LogoutDialog;

    before(async () => {
        header = new Header();
        navigationMenu = new NavigationMenu();
        loginScreen = new LoginScreen();
        logoutDialog = new LogoutDialog();
    });

    beforeEach(async () => {
        await appStateHelper.resetApp();
        await header.openMenu();
        await navigationMenu.selectLogin();
        await loginScreen.login(env.username, env.password);
    });

    it('Logout when confirmation is accepted', async () => {
        await header.openMenu();
        await navigationMenu.selectLogout();
        await logoutDialog.confirmLogout();
        await header.openMenu();
        await expect(navigationMenu.loginOption).toBeDisplayed();
        await expect(navigationMenu.loginOption).toHaveText('Log In');
        await expect(navigationMenu.logoutOption).not.toBeDisplayed();
    });

    it('Remain logged in when logout is cancelled', async () => {
        await header.openMenu();
        await navigationMenu.selectLogout();
        await logoutDialog.cancelLogout();
        await header.openMenu();
        await expect(navigationMenu.logoutOption).toBeDisplayed();
        await expect(navigationMenu.logoutOption).toHaveText('Log Out');
    });
});