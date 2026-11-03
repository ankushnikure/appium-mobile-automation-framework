import { LoginScreen } from '@screens/login.screen';

class AuthHelper {
    async login(username: string, password: string): Promise<void> {
        const loginScreen = new LoginScreen();
        await loginScreen.login(username, password);
    }
}

export default new AuthHelper();