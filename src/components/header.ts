import { Page, Locator } from "@playwright/test";

export class Header {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly navMenu: Locator;
  readonly signInLink: Locator;
  readonly createAccountLink: Locator;
  readonly check;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator("input#search");
    this.searchButton = page.locator("button.action.search");
    this.navMenu = page.locator(".nav-sections");
    this.signInLink = page.getByRole("link", { name: "Sign In" });
    this.createAccountLink = page.getByRole("link", {
      name: "Create an Account",
    });
  }

  async searchForItem(query: string): Promise<void> {
    await this.searchInput.fill(query);
    await this.searchButton.click();
  }

  async isNavMenuVisible(): Promise<boolean> {
    return await this.navMenu.isVisible();
  }
}
