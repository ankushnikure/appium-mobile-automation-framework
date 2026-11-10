import { expect } from '@wdio/globals';
import catalogScreen from '@screens/catalog.screen';
import productDetailScreen from '@screens/product-detail.screen';

describe('Catalog', () => {

    describe('Product Listing', () => {
        it('should display products', async () => {
            expect(await catalogScreen.getProductCount()).toBeGreaterThan(0);
        });

        it('should display product details', async () => {
            const productTitles = await catalogScreen.getAllProductTitles();
            const productPrices = await catalogScreen.getAllProductPrices();
            expect(productTitles.length).toBeGreaterThan(0);
            expect(productPrices.length).toBe(productTitles.length);
        });
    });

    describe('Navigation', () => {
        it('should open product detail page when tapping a product', async () => {
            const index = 0
            const titleOnCatalog = await catalogScreen.getProductTitle(index);
            await catalogScreen.tapProduct(index);
            const titleOnPDP = await productDetailScreen.getProductTitle();
            expect(titleOnPDP).toEqual(titleOnCatalog);
        });
    });
});

