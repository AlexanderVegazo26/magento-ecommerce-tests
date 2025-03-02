import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base-page';
import { Header } from '../components/header';

export class CheckoutPaymentPage extends BasePage {
  readonly header: Header;
 
  readonly placeOrderButton: Locator;
  readonly thankYouMessage: Locator;
  readonly orderNumberMessage: Locator;
  readonly emailConfirmationMessage: Locator;
  readonly continueShoppingLink: Locator;



  constructor(page: Page) {
    super(page);
    this.header = new Header(page);
  
    this.placeOrderButton = page.getByRole('button', { name: 'Place Order' });
    this.thankYouMessage = page.getByText('Thank you for your purchase!');
    this.orderNumberMessage = page.getByText('Your order # is:');
    this.emailConfirmationMessage = page.getByText("We'll email you an order");
    this.continueShoppingLink = page.getByRole('link', { name: 'Continue Shopping' });
  }

 

  async placeOrder(): Promise<void> {
    await this.placeOrderButton.click();
    await this.thankYouMessage.waitFor({ state: 'visible' });
  }

  async verifyOrderSuccess(): Promise<void> {
    await expect(this.thankYouMessage).toBeVisible();
    await expect(this.orderNumberMessage).toBeVisible();
    await expect(this.emailConfirmationMessage).toBeVisible();
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingLink.click();
    await this.page.waitForURL("/");
  }
}