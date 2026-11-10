export class Gestures {

    async swipeScreen(direction: string, percentage = 0.75) {
        const { width, height } = await browser.getWindowSize();

        const startX = Math.round(width * 0.5);
        const startY = Math.round(height * 0.5);

        let endX = startX;
        let endY = startY;

        switch (direction) {
            case 'up':
                endY = Math.round(height * (0.5 - percentage / 2));
                break;
            case 'down':
                endY = Math.round(height * (0.5 + percentage / 2));
                break;
            case 'left':
                endX = Math.round(width * (0.5 - percentage / 2));
                break;
            case 'right':
                endX = Math.round(width * (0.5 + percentage / 2));
                break;
            default:
                throw new Error(`Unknown swipe direction: ${direction}`);
        }

        await browser.action('pointer', {
            parameters: { pointerType: 'touch' },
        })
            .move({ x: startX, y: startY })
            .down()
            .pause(100)
            .move({ duration: 800, x: endX, y: endY })
            .up()
            .perform();
    }

    async swipeElement(element: WebdriverIO.Element, direction: string, percentage = 0.75) {
        const { x, y, width, height } = await element.getLocation().then(async (loc) => {
            const size = await element.getSize();
            return { ...loc, ...size };
        });

        const startX = Math.round(x + width * 0.5);
        const startY = Math.round(y + height * 0.5);
        let endX = startX;
        let endY = startY;

        switch (direction) {
            case 'up':
                endY = Math.round(y + height * (1 - percentage));
                break;
            case 'down':
                endY = Math.round(y + height * percentage);
                break;
            case 'left':
                endX = Math.round(x + width * (1 - percentage));
                break;
            case 'right':
                endX = Math.round(x + width * percentage);
                break;
            default:
                throw new Error(`Unknown swipe direction: ${direction}`);
        }

        await browser.action('pointer', {
            parameters: { pointerType: 'touch' },
        })
            .move({ x: startX, y: startY })
            .down()
            .pause(100)
            .move({ duration: 800, x: endX, y: endY })
            .up()
            .perform();
    }

    async scrollToElement1(selector: WebdriverIO.Element, maxScrolls = 10) {
        // log.debug(`Scrolling to find element: ${selector}`);
        let found = false;

        for (let i = 0; i < maxScrolls; i++) {
            const element = await $(selector);
            if (await element.isDisplayed()) {
                found = true;
                break;
            }
            await this.swipeScreen('up');
        }

        if (!found) {
            throw new Error(`Element not found after ${maxScrolls} scroll attempts: ${selector}`);
        }
    }

    async scrollToElement(element: WebdriverIO.Element, maxScrolls = 10): Promise<void> {
        for (let i = 0; i < maxScrolls; i++) {
            if (await element.isDisplayed()) {
                return;
            }

            await this.swipeScreen('up');
        }

        throw new Error(`Element not visible after ${maxScrolls} scroll attempts`);
    }

    async scrollDown(percentage = 0.6) {
        await this.swipeScreen('up', percentage);
    }

    async scrollUp(percentage = 0.6) {
        await this.swipeScreen('down', percentage);
    }

    async longPress(element: WebdriverIO.Element, duration = 2000) {
        // log.debug(`Long pressing element for ${duration}ms`);
        const location = await element.getLocation();
        const size = await element.getSize();

        const x = Math.round(location.x + size.width / 2);
        const y = Math.round(location.y + size.height / 2);

        await browser.action('pointer', {
            parameters: { pointerType: 'touch' },
        })
            .move({ x, y })
            .down()
            .pause(duration)
            .up()
            .perform();
    }

    async doubleTap(element: WebdriverIO.Element) {
        // log.debug('Double tapping element');
        const location = await element.getLocation();
        const size = await element.getSize();

        const x = Math.round(location.x + size.width / 2);
        const y = Math.round(location.y + size.height / 2);

        await browser.action('pointer', {
            parameters: { pointerType: 'touch' },
        })
            .move({ x, y })
            .down()
            .up()
            .pause(100)
            .down()
            .up()
            .perform();
    }

    async pinchToZoom(scale = 0.5) {
        // log.debug(`Pinching to zoom with scale: ${scale}`);
        const { width, height } = await browser.getWindowSize();
        const centerX = Math.round(width / 2);
        const centerY = Math.round(height / 2);
        const offset = Math.round(Math.min(width, height) * 0.2);

        await browser.performActions([
            {
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: centerX - offset, y: centerY },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 100 },
                    { type: 'pointerMove', duration: 600, x: centerX - Math.round(offset * scale), y: centerY },
                    { type: 'pointerUp', button: 0 },
                ],
            },
            {
                type: 'pointer',
                id: 'finger2',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: centerX + offset, y: centerY },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 100 },
                    { type: 'pointerMove', duration: 600, x: centerX + Math.round(offset * scale), y: centerY },
                    { type: 'pointerUp', button: 0 },
                ],
            },
        ]);
    }
}

export default new Gestures();