import { ProductsScreen } from '@screens/products.screen';
import { ProductDetailsScreen } from '@screens/product-details.screen';
import { expect } from '@wdio/globals';

const appId = 'com.saucelabs.mydemoapp.android';

describe('Products List Tests', () => {
    let productsScreen: ProductsScreen;
    let productDetailsScreen: ProductDetailsScreen;

    before(async () => {
        productsScreen = new ProductsScreen();
        productDetailsScreen = new ProductDetailsScreen();
    });

    beforeEach(async () => {
        // Reset the app to start on Products with the list at the top
        await browser.execute('mobile: clearApp', { appId });
        await browser.execute('mobile: activateApp', { appId });
    });

    it('Open product details after selecting a product', async () => {
        const productName = 'Sauce Labs Backpack (yellow)';

        // Scroll to the target product
        await productsScreen.scrollToProduct(productName);
        await expect(productsScreen.productImage(productName)).toBeDisplayed();

        // Open product details
        await productsScreen.openProduct(productName);

        // Validate the product details screen
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