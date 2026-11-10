import { expect } from '@wdio/globals';
import navigation from '@components/navigation.component';
import cartScreen from '@screens/cart.screen';
import catalogScreen from '@screens/catalog.screen'
import productDetailScreen from '@screens/product-detail.screen'


describe('Cart', () => {

    describe('Empty Cart', () => {
        it('should display empty cart when no items are added', async () => {
            await navigation.openCart();
            expect(await cartScreen.isCartEmpty()).toBe(true);
        });

        it('should display continue shopping button', async () => {
            await navigation.openCart();
            expect(await cartScreen.isContinueShoppingButtonDisplayed()).toBe(true);
        });
    });

    describe('Cart Operations', () => {
        beforeEach(async () => {
            await catalogScreen.tapProduct();
            await productDetailScreen.addProductToCart();
            await navigation.openCart();
        });

        it('should display added item', async () => {
            const itemCount = await cartScreen.getCartItemCount();
            expect(itemCount).toBeGreaterThan(0);
        });

        it('should remove item from cart', async () => {
            const initialCount = await cartScreen.getCartItemCount();
            await cartScreen.removeItem();
            const finalCount = await cartScreen.getCartItemCount();
            expect(finalCount).toBeLessThan(initialCount);
        });
    });
});