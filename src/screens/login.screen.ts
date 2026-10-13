import { $ } from '@wdio/globals';

export class LoginScreen {

    get loginTitle() {
        return $('id=com.saucelabs.mydemoapp.android:id/loginTV');
    }

}