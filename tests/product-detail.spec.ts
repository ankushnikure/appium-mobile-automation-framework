import navigationComponent from '@components/navigation.component';
import appState from '@helpers/app-state.helper';
import Platform from '@helpers/platform.helper';
import catalogScreen from '@screens/catalog.screen';
import productDetailScreen from '@screens/product-detail.screen';

describe('Product Detail', () => {

    beforeEach((async () => {
        appState.resetApp();
    }));

    describe('Product Information', () => {
        it('should display product price', async () => {
            const index = 0
            const priceOnCatalog = await catalogScreen.getProductPrice(index);
            await catalogScreen.tapProduct(index);
            const priceeOnPDP = await productDetailScreen.getProductPrice();
            if (Platform.isIOS) {
                expect(priceeOnPDP).toEqual("$ 29.99");
            } else {
                expect(priceeOnPDP).toEqual(priceOnCatalog);
            }
        });
    });

    describe('Navigation', () => {
        it('should navigate back to catalog', async () => {
            await catalogScreen.tapProduct(0);
            await productDetailScreen.navigateBackToCatalog();
            expect(await catalogScreen.getProductCount()).toBeGreaterThan(0);
        });
    });

    describe('Add to Cart', () => {
        it('should add product to cart', async () => {
            await catalogScreen.tapProduct(0);
            await productDetailScreen.addProductToCart();
            const badgeCount = await navigationComponent.getCartBadgeCount();
            expect(badgeCount).toBeGreaterThanOrEqual(1);
        });

        it('should update cart badge based on product quantity', async () => {
            await catalogScreen.tapProduct(0);
            await productDetailScreen.increaseItemQuantity(1);
            await productDetailScreen.addProductToCart();
            const badgeCount = await navigationComponent.getCartBadgeCount();
            expect(badgeCount).toBe(2);
        });
    });
});