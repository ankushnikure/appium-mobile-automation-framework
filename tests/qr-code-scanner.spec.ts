import { Header } from '@components/header.component';
import { NavigationMenu } from '@components/navigation-menu.component';
import { QrCodeScannerScreen } from '@screens/qr-code-scanner.screen';
import { expect } from '@wdio/globals';
import appStateHelper from '@helpers/app-state.helper';

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
        await appStateHelper.resetApp();
        await header.openMenu();
        await navigationMenu.selectQrCodeScanner();
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
