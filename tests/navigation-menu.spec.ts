import { Header } from '@components/header.component';
import { NavigationMenu } from '@components/navigation-menu.component';
import { LoginScreen } from '@screens/login.screen';
import { expect } from '@wdio/globals';

describe('Navigation Menu Tests', () => {
    let header: Header;
    let navigationMenu: NavigationMenu;
    let loginScreen: LoginScreen;

    beforeEach(() => {
        header = new Header();
        navigationMenu = new NavigationMenu();
        loginScreen = new LoginScreen();

    });

    it('Open the Login screen from the navigation menu', async () => {
        // Open the menu and select Login
        await header.openMenu();
        await navigationMenu.selectLogin();

        // Validate the Login screen title
        await expect(loginScreen.loginTitle).toBeDisplayed();
        await expect(loginScreen.loginTitle).toHaveText('Login');

        console.log('Screen title:', await loginScreen.loginTitle.getText());
    });
});