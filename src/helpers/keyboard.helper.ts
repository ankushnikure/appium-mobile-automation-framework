export class KeyboardHelper {

    async hideKeyboard(): Promise<void> {
        await browser.hideKeyboard();
    }
}