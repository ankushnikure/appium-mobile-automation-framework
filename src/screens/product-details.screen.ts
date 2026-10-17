import { $ } from '@wdio/globals';

export class ProductDetailsScreen {
    //Locators
    public get addToCartButton() {
        return $('~Tap to add product to cart');
    }
}