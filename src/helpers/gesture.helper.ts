export class GestureHelper {

    async scroll(element: WebdriverIO.Element, direction: 'up' | 'down' | 'left' | 'right'): Promise<boolean> {
        return driver.execute('mobile: scrollGesture', {
            elementId: element.elementId,
            direction,
            percent: 0.75
        });
    }

    async swipe(element: WebdriverIO.Element, direction: 'up' | 'down' | 'left' | 'right'): Promise<boolean> {
        return driver.execute('mobile: swipeGesture', {
            elementId: element.elementId,
            direction,
            percent: 0.075
        });
    }

    async longPress(element: WebdriverIO.Element): Promise<void> {
        return driver.execute('mobile: longClickGesture', {
            elementId: element.elementId,
            duration: 2000,
        });
    }
}