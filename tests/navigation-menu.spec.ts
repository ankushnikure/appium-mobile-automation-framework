import { NavigationMenu } from '@components/navigation-menu.component';
import { LoginScreen } from '@screens/login.screen';
import { expect } from '@wdio/globals';

describe('Navigation Menu Tests', () => {
    let navigationMenu: NavigationMenu;

    beforeEach(() => {
        navigationMenu = new NavigationMenu();
    });

    it('Open the Login screen from the navigation menu', async () => {

        const loginScreen = new LoginScreen();

        // Open the menu and select Login
        await navigationMenu.openMenu();
        await navigationMenu.selectLogin();

        // Validate the Login screen title
        await expect(loginScreen.loginTitle).toBeDisplayed();
        await expect(loginScreen.loginTitle).toHaveText('Login');

        console.log('Screen title:', await loginScreen.loginTitle.getText());
    });
});