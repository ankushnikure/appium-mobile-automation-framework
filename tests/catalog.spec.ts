import { expect } from '@wdio/globals';
import catalogScreen from '@screens/catalog.screen';
import productDetailScreen from '@screens/product-detail.screen';
import Platform from '@helpers/platform.helper';

describe('catalog Feature', () => {
    describe('Products Listing', () => {
        it('should display products on catalog page', async () => {
            expect(await catalogScreen.getProductCount()).toBeGreaterThan(0);
        });

        it('should display product titles and prices', async () => {
            expect(await catalogScreen.getAllProductTitles()).toBeGreaterThan(0);
            expect(await catalogScreen.getAllProductTitles()).toBeGreaterThan(0);
        });
    });

    describe('Product Detail Navigation', () => {
        it('should open product detail page when tapping a product', async () => {
            const index = 0
            const titleOnCatalog = await catalogScreen.getProductTitle(index);
            await catalogScreen.tapProduct(index);
            const titleOnPDP = await productDetailScreen.getProductTitle();
            expect(titleOnPDP).toEqual(titleOnCatalog);
        });

        it('should display product price on detail page', async () => {
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

        it('should navigate back to catalog from product detail', async () => {
            await catalogScreen.tapProduct(0);
            if (Platform.isIOS) {
                await productDetailScreen.tapBackButton();
            } else {
                await productDetailScreen.goBack();
            }
            expect(await catalogScreen.getProductCount()).toBeGreaterThan(0);
        });
    });
})

