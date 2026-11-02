import { ProductsScreen } from '@screens/products.screen';
import { ProductDetailsScreen } from '@screens/product-details.screen';
import { expect } from '@wdio/globals';
import appStateHelper from '@helpers/app-state.helper';

describe('Products List Tests', () => {
    let productsScreen: ProductsScreen;
    let productDetailsScreen: ProductDetailsScreen;

    before(async () => {
        productsScreen = new ProductsScreen();
        productDetailsScreen = new ProductDetailsScreen();
    });

    beforeEach(async () => {
        await appStateHelper.resetApp();
    });

    it('Open product details after selecting a product', async () => {
        const productName = 'Sauce Labs Backpack (yellow)';

        await productsScreen.scrollToProduct(productName);
        await expect(productsScreen.productImage(productName)).toBeDisplayed();
        await productsScreen.openProduct(productName);
        await expect(productDetailsScreen.addToCartButton).toBeDisplayed();
        await expect(productDetailsScreen.addToCartButton).toHaveText('Add to cart');
    });

    it('Find a product by swiping through the product list', async () => {
        await productsScreen.swipeToProduct('Sauce Labs Onesie');
    });

    it('Long pressing a product', async () => {
        await productsScreen.longPress(
            await productsScreen.productTitle('Sauce Labs Backpack'));
    });
});