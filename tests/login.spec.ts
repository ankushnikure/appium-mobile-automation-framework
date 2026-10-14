import { NavigationMenu } from '@components/navigation-menu.component';
import { LoginScreen } from '@screens/login.screen';
import { expect } from '@wdio/globals';

describe('Login Tests', () => {
    let navigationMenu: NavigationMenu;
    let loginScreen: LoginScreen;

    beforeEach(() => {
        navigationMenu = new NavigationMenu();
        loginScreen = new LoginScreen();
    });

    it('Login with valid credentials', async () => {

        // Open the Login screen
        await navigationMenu.openMenu();
        await navigationMenu.selectLogin();

        // Login with valid credentials
        await loginScreen.login('bod@example.com', '10203040');

        // Open the menu and validate the logout option
        await navigationMenu.openMenu();
        await expect(navigationMenu.logoutOption).toBeDisplayed();
        await expect(navigationMenu.logoutOption).toHaveText('Log Out');
    });
});