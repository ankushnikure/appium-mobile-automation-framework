import { ProductDetailsScreen } from '@screens/product-details.screen'
import { ProductsScreen } from '@screens/catalog.screen'
import { Header } from '@components/header.component';
import productsData from '@test-data/products.data.json'
import { expect } from '@wdio/globals';
import appStateHelper from '@helpers/app-state.helper';

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
        await appStateHelper.resetApp();
    });

    it('Update the cart badge after adding a product', async () => {
        const productName = productsData.backpack.yellow;

        await productsScreen.scrollToProduct(productName);
        await productsScreen.openProduct(productName);
        await productDetailsScreen.addToCartProduct();
        await expect(header.cartBadge).toHaveText('1');
    });

    it('Add a product to the cart and open the cart screen', async () => {
        const productName = productsData.backpack.yellow;

        await productsScreen.scrollToProduct(productName);
        await productsScreen.openProduct(productName);
        await productDetailsScreen.addToCartProduct();
        await expect(header.cartBadge).toHaveText('1');
        await header.openCart();
    });
});