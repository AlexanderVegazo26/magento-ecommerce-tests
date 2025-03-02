import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base-page";
import { Header } from "../components/header";
import { ShippingMethodType } from "../util/shipping-method.enum";

export class CheckoutShippingPage extends BasePage {
  readonly header: Header;
  readonly emailInput: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly companyInput: Locator;
  readonly streetLine1: Locator;
  readonly streetLine2: Locator;
  readonly streetLine3: Locator;
  readonly cityInput: Locator;
  readonly stateSelect: Locator;
  readonly countrySelect: Locator;
  readonly zipInput: Locator;
  readonly phoneInput: Locator;
  readonly nextButton: Locator;


  constructor(page: Page) {
    super(page);
    this.header = new Header(page);
    this.emailInput = page.getByRole("textbox", { name: "Email Address" });
    this.firstNameInput = page.getByRole("textbox", { name: "First Name" });
    this.lastNameInput = page.getByRole("textbox", { name: "Last Name" });
    this.companyInput = page.getByRole("textbox", { name: "Company" });
    this.streetLine1 = page.getByRole("textbox", {
      name: "Street Address: Line 1",
    });
    this.streetLine2 = page.getByRole("textbox", {
      name: "Street Address: Line 2",
    });
    this.streetLine3 = page.getByRole("textbox", {
      name: "Street Address: Line 3",
    });
    this.cityInput = page.getByRole("textbox", { name: "City" });
    this.stateSelect = page.getByRole("combobox", { name: /state|region/i });
    this.countrySelect = page.getByRole("combobox", { name: /country/i });
    this.zipInput = page.getByRole("textbox", { name: "Zip/Postal Code" });
    this.phoneInput = page.getByRole("textbox", { name: "Phone Number" });
    this.nextButton = page.getByRole("button", { name: "Next" });
  }

  async fillShippingDetails(shippingInfo: ShippingDetails): Promise<void> {
    await this.emailInput.fill(shippingInfo.email);
    await this.firstNameInput.fill(shippingInfo.firstName);
    await this.lastNameInput.fill(shippingInfo.lastName);
    await this.companyInput.fill(shippingInfo?.company ?? '');
    await this.streetLine1.fill(shippingInfo.street1);
    await this.streetLine2.fill(shippingInfo.street2 ?? '');
    await this.streetLine3.fill(shippingInfo.street3 ?? '');
    await this.cityInput.fill(shippingInfo.city);
    await this.stateSelect.selectOption({ label: shippingInfo.state });
    await this.countrySelect.selectOption(shippingInfo.country);
    await this.zipInput.fill(shippingInfo.zip);
    await this.phoneInput.fill(shippingInfo.phone);
  }

  async selectShippingMethod(methodType: ShippingMethodType): Promise<void> {
    try {
      // First identify which method ID to use
      let methodId, carrierText;
      switch (methodType) {
        case ShippingMethodType.Fixed:
          methodId = 'label_method_flatrate_flatrate';
          carrierText = 'Flat Rate';
          break;
        case ShippingMethodType.TableRate:
          methodId = 'label_method_bestway_tablerate';
          carrierText = 'Best Way';
          break;
        default:
          throw new Error(`Unsupported shipping method: ${methodType}`);
      }
      
    
      const radioLocator = this.page.locator(`input[type="radio"][aria-labelledby~="${methodId}"]`);
   
      await this.page.locator(`tr:has-text("${carrierText}")`).click();
      

      await radioLocator.check({ force: true });
      
      
      console.log(`Successfully selected "${methodType}" shipping method`);
    } catch (error) {
      console.error(`Failed to select "${methodType}" shipping method:`, error);
      throw error;
    }
  }

  async proceedToPayment(): Promise<void> {
    await this.nextButton.click();
  }
}
