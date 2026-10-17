import { ProductDetailsScreen } from '@screens/product-details.screen'
import { ProductsScreen } from '@screens/products.screen'
import { Header } from '@components/headers.component';
import productsData from '@test-data/products.data.json'

const appId = 'com.saucelabs.mydemoapp.android';

describe('Product Details Test', () => {
    let productsScreen: ProductsScreen;
    let productDetailsScreen: ProductDetailsScreen;
    let header: Header;

    before(() => {
        productsScreen = new ProductsScreen();
        productDetailsScreen = new ProductDetailsScreen();
        header = new Header();
    });

    beforeEach(async () => {
        // Clear app data and relaunch before each test
        await browser.execute('mobile: clearApp', { appId });
        await browser.execute('mobile: activateApp', { appId });
    });

    it('Update the cart badge after adding a product', async () => {

        const productName = productsData.backpack.yellow;

        // Open product details
        await productsScreen.scrollToProduct(productName);
        await productsScreen.openProduct(productName);

        // Add the product to the cart
        await productDetailsScreen.addToCartProduct();

        // Validate the cart quantity
        await expect(header.cartBadge).toHaveText('1');
    });
});