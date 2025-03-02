import { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';
import { Header } from '../components/header';
import { MiniCart } from '../components/mini-cart';

export class ProductDetailPage extends BasePage {
  readonly header: Header;
  readonly miniCart: MiniCart;
  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly addToCartButton: Locator;
  readonly sizeOptions: Locator;
  readonly colorOptions: Locator;
  readonly quantityInput: Locator;
  readonly productDescription: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.header = new Header(page);
    this.miniCart = new MiniCart(page);
    this.productName = page.locator('.page-title .base');
    this.productPrice = page.locator('.product-info-price .price');
    this.addToCartButton = page.locator('#product-addtocart-button');
    this.sizeOptions = page.locator('.swatch-option.text');
    this.colorOptions = page.locator('.swatch-option.color');
    this.quantityInput = page.locator('#qty');
    this.productDescription = page.locator('#description');
    this.successMessage = page.locator('.message-success');
  }

  async goto(productUrl: string): Promise<void> {
    await this.navigate(productUrl);
    await this.waitForLoad();
  }

  async selectSize(size: string): Promise<void> {
    await this.sizeOptions.filter({ hasText: size }).click();
  }

  async selectColor(color: string): Promise<void> {
    await this.colorOptions.filter({ has: this.page.locator(`[option-label="${color}"]`) }).click();
  }

  async setQuantity(quantity: number): Promise<void> {
    await this.quantityInput.fill(quantity.toString());
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
    await this.successMessage.waitFor({ state: 'visible' });
  }

  async getProductName(): Promise<string | null> {
    return await this.productName.textContent();
  }

  async getProductPrice(): Promise<string | null> {
    return await this.productPrice.textContent();
  }

  async openMiniCart(): Promise<void> {
    await this.page.locator('.action.showcart').click();
    await this.miniCart.miniCartWrapper.waitFor({ state: 'visible' });
  }
}