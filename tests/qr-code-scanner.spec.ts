import { Header } from '@components/header.component';
import { NavigationMenu } from '@components/navigation-menu.component';
import { QrCodeScannerScreen } from '@screens/qr-code-scanner.screen';
import { browser, expect } from '@wdio/globals';

const appId = 'com.saucelabs.mydemoapp.android';

// Tests handling of the Android camera permission dialog.
describe('QR Code Scanner Permission Tests', () => {
    let header: Header;
    let navigationMenu: NavigationMenu;
    let qrCodeScannerScreen: QrCodeScannerScreen;

    before(() => {
        header = new Header();
        navigationMenu = new NavigationMenu();
        qrCodeScannerScreen = new QrCodeScannerScreen();
    });

    beforeEach(async () => {
        // Reset app data to restore the initial permission state.
        await browser.execute('mobile: clearApp', { appId });
        await browser.execute('mobile: activateApp', { appId });

        await header.openMenu();
        await navigationMenu.selectQrCodeScanner();

        // Verify that the camera permission dialog is displayed.
        await expect(qrCodeScannerScreen.permissionIcon).toBeDisplayed();
        await expect(qrCodeScannerScreen.permissionMessage).toHaveText(
            'Allow My Demo App to take pictures and record video?',
        );
    });

    it('Grant camera permission while using the app', async () => {
        await qrCodeScannerScreen.allowWhileUsingTheApp();
        await expect(qrCodeScannerScreen.previewView).toBeDisplayed();
    });

    it('Grant camera permission for this time only', async () => {
        await qrCodeScannerScreen.allowOnlyThisTime();
        await expect(qrCodeScannerScreen.previewView).toBeDisplayed();
    });

    it('Deny camera permission', async () => {
        await qrCodeScannerScreen.dontAllow();
        await expect(qrCodeScannerScreen.previewView).not.toBeDisplayed();
    });
});
