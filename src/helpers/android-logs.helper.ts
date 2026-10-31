import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

export class AndroidLogsHelper {
    async captureLogs(testName: string): Promise<void> {
        const logDirectory = path.join(process.cwd(), 'artifacts', 'android-logs',);

        fs.mkdirSync(logDirectory, { recursive: true });

        const fileName = testName.replace(/[^a-zA-Z0-9-_]/g, '_');
        const logPath = path.join(logDirectory, `${fileName}.log`);

        const logs = execSync('adb logcat -d -v time', {
            encoding: 'utf-8',
            maxBuffer: 10 * 1024 * 1024,
        });

        fs.writeFileSync(logPath, logs);
    }
}

export default new AndroidLogsHelper();