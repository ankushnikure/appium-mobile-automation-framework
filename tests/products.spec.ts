import { ProductDetailsScreen } from '@screens/product-details.screen';
import { ProductsScreen } from '@screens/products.screen';
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

    it('Display the target product after scrolling', async () => {
        const productName = 'Sauce Labs Bolt T-Shirt';

        // Scroll to the target product
        await productsScreen.scrollToProduct(productName);

        // Validate the product image and title
        await expect(productsScreen.productImage(productName)).toBeDisplayed();
        await expect(productsScreen.productTitle(productName)).toHaveText('Sauce Labs Bolt T-Shirt');
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

    it('Swipe through the product list', async () => {
        await productsScreen.swipe('up');
    });

    it('Find a product by swiping through the product list', async () => {
        const productName = 'Sauce Labs Onesie';
        await productsScreen.swipeToProduct(productName);
    });

    it('Long pressing a product', async () => {
        await productsScreen.longPress(
            await productsScreen.productTitle('Sauce Labs Onesie'));
    });
});