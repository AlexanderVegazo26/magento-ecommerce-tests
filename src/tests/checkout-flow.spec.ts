import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home-page";
import { ProductDetailPage } from "../pages/product-detail-page";
import { CheckoutShippingPage } from "../pages/checkout-shipping-page";
import { CheckoutPaymentPage } from "../pages/checkout-payment-page";
import { ShippingMethodType } from "../util/shipping-method.enum";
import { generateShippingDetails } from "../util/generate-shipping-details";

test("Complete checkout flow", async ({ page }) => {
  const homePage = new HomePage(page);
  const productDetailPage = new ProductDetailPage(page);
  const checkoutShippingPage = new CheckoutShippingPage(page);
  const checkoutPaymentPage = new CheckoutPaymentPage(page);

  await homePage.goTo();
  await homePage.searchAndGoToProduct("Driven Backpack");

  await productDetailPage.addToCart();
  await expect(productDetailPage.successMessage).toBeVisible()

  await productDetailPage.openMiniCart();
  await productDetailPage.miniCart.proceedToCheckout();

  await checkoutShippingPage.fillShippingDetails(generateShippingDetails());

  await checkoutShippingPage.selectShippingMethod(ShippingMethodType.Fixed);
  await checkoutShippingPage.proceedToPayment();

  await checkoutPaymentPage.placeOrder();

  await checkoutPaymentPage.verifyOrderSuccess();
  await checkoutPaymentPage.continueShopping();
});
