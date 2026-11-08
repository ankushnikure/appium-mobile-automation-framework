import { expect } from '@wdio/globals';
import navigation from '@components/navigation.component';
import cartScreen from '@screens/cart.screen';
import catalogScreen from '@screens/catalog.screen'
import productDetailScreen from '@screens/product-detail.screen'


describe('Shopping Cart Feature', () => {

    describe('Empty Cart', () => {
        it('Show empty cart when no items added', async () => {
            await navigation.openCart();
            expect(await cartScreen.isCartEmpty()).toBe(true);
        });

        it('Show continue shopping button on empty cart', async () => {
            await navigation.openCart();
            expect(await cartScreen.isContinueShoppingButtonDisplayed()).toBe(true);
        });
    });

    describe('Cart with items', () => {
        beforeEach(async () => {
            await catalogScreen.tapProduct();
            await productDetailScreen.addToCart();
            await navigation.openCart();
        });

        it('Show added item in cart', async () => {
            expect(await cartScreen.getCartItemCount()).toBeGreaterThan(0);
        });

        it('Remove item from cart', async () => {
            const intialCount = await cartScreen.getCartItemCount();
            await cartScreen.removeItem();
            const finalCount = await cartScreen.getCartItemCount();
            expect(finalCount).toBeLessThan(intialCount);
        });
    });
});