import { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';
import { Header } from '../components/header';

export class SearchResultsPage extends BasePage {
  readonly header: Header;
  readonly resultsList: Locator;

  constructor(page: Page) {
    super(page);
    this.header = new Header(page); 
    this.resultsList = page.locator('.products.list.items');
  }

  async getResultsCount(): Promise<number> {
    return await this.resultsList.count();
  }
}