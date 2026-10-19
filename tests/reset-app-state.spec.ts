import { Header } from '@components/header.component';
import { NavigationMenu } from '@components/navigation-menu.component';
import { ResetAppStateDialog } from '@components/reset-app-state.dialog.component';

// Tests handling of native app dialogs for Reset App State
describe('Reset App State Test', () => {
    let header: Header;
    let navigationMenu: NavigationMenu;
    let resetAppStateDialog: ResetAppStateDialog;

    beforeEach(async () => {
        header = new Header();
        navigationMenu = new NavigationMenu();
        resetAppStateDialog = new ResetAppStateDialog();

        await header.openMenu();
        await navigationMenu.selectResetAppState();
    });

    it('Cancel reset app state', async () => {
        await resetAppStateDialog.cancelResetApp();
        await expect(resetAppStateDialog.resetAppStateTitle).not.toBeDisplayed();
        await expect(resetAppStateDialog.appHasBeenResetText).not.toBeDisplayed();
    });

    it('Confirm reset app state', async () => {
        await resetAppStateDialog.confirmResetApp();
        await expect(resetAppStateDialog.appHasBeenResetText).toBeDisplayed();
        await resetAppStateDialog.dismissResetSuccessMessage();
    });
});