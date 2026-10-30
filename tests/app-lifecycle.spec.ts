import { Header } from '@components/header.component';
import { NavigationMenu } from '@components/navigation-menu.component';
import { LoginScreen } from '@screens/login.screen';
import { ProductsScreen } from '@screens/products.screen';
import { browser, expect } from '@wdio/globals';

const appId = 'com.saucelabs.mydemoapp.android'

describe('App Lifecycle Tests', () => {
    let header: Header;
    let navigationMenu: NavigationMenu;
    let loginScreen: LoginScreen;
    let productsScreen: ProductsScreen;

    before(() => {
        header = new Header();
        navigationMenu = new NavigationMenu();
        loginScreen = new LoginScreen();
        productsScreen = new ProductsScreen();
    });

    beforeEach(async () => {
        await header.openMenu();
        await navigationMenu.selectLogin();
        await expect(loginScreen.loginTitle).toBeDisplayed();
    });

    it('Resume the app from the background and retain the current screen', async () => {
        await browser.background(-1);
        await browser.activateApp(appId);

        await expect(loginScreen.loginTitle).toBeDisplayed();
    });

    it('Relaunch the app after termination', async () => {
        await browser.terminateApp(appId);
        await browser.activateApp(appId);

        await expect(productsScreen.screenTitle).toBeDisplayed();
    });
});