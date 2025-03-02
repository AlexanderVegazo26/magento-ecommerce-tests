import { Page, Locator } from "@playwright/test";

export class MiniCart {
  readonly page: Page;
  readonly miniCartWrapper: Locator;
  readonly cartTitle: Locator;
  readonly itemCount: Locator;
  readonly subtotal: Locator;
  readonly proceedToCheckoutButton: Locator;
  readonly viewCartLink: Locator;
  readonly closeButton: Locator;
  readonly cartItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.miniCartWrapper = page.locator("#minicart-content-wrapper");
    this.cartTitle = page.locator(".block-title .text");
    this.itemCount = page.locator(".items-total .count");
    this.subtotal = page.locator(".subtotal .price-container .price");
    this.proceedToCheckoutButton = page.locator("#top-cart-btn-checkout");
    this.viewCartLink = page.locator(".action.viewcart");
    this.closeButton = page.locator("#btn-minicart-close");
    this.cartItems = page.locator("ol#mini-cart .minicart-items .product-item");
  }

  async isVisible(): Promise<boolean> {
    return await this.miniCartWrapper.isVisible();
  }

  async getItemCount(): Promise<number> {
    const countText = await this.itemCount.textContent();
    return countText ? parseInt(countText, 10) : 0;
  }

  async getSubtotal(): Promise<string | null> {
    return await this.subtotal.textContent();
  }

  async getCartItemNames(): Promise<string[]> {
    return await this.cartItems.locator(".product-item-name").allTextContents();
  }

  async proceedToCheckout(): Promise<void> {
    await this.proceedToCheckoutButton.click();
  }

  async viewCart(): Promise<void> {
    await this.viewCartLink.click();
  }

  async close(): Promise<void> {
    await this.closeButton.click();
    await this.miniCartWrapper.waitFor({ state: "hidden" });
  }
}
