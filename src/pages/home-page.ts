import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base-page";
import { Header } from "../components/header";
import { MiniCart } from "../components/mini-cart";

export class HomePage extends BasePage {
  readonly header: Header;
  readonly miniCart: MiniCart;
  readonly trendingSection: Locator;
  readonly welcomeMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.header = new Header(page);
    this.miniCart = new MiniCart(page);
    this.trendingSection = page.locator(".block.widget.block-promo");
    this.welcomeMessage = page.locator(".page-header .notices");
  }

  async goTo(): Promise<void> {
    await this.navigate("/");
    await this.waitForLoad();
  }

  // Responsible for performing a search
  private async searchProduct(query: string): Promise<void> {
    await this.header.searchInput.fill(query);
    await this.header.searchInput.press("Enter");
    await this.page
      .getByRole("heading", { name: `Search results for: '${query}'` })
      .waitFor();
  }

  // Responsible for selecting a product from search results
  private async selectProductFromResults(productName: string): Promise<void> {
    await this.page.getByRole("link", { name: productName }).first().click();
  }

  // This method now orchestrates the search flow but delegates specific responsibilities
  async searchAndGoToProduct(query: string): Promise<void> {
    await this.searchProduct(query);
    await this.selectProductFromResults(query);
  }

  async openMiniCart(): Promise<void> {
    await this.page.locator(".action.showcart").click();
    await this.miniCart.miniCartWrapper.waitFor({ state: "visible" });
  }

  async getWelcomeMessageText(): Promise<string> {
    return (await this.welcomeMessage.textContent()) || "";
  }

  async isTrendingSectionVisible(): Promise<boolean> {
    return await this.trendingSection.isVisible();
  }
}
