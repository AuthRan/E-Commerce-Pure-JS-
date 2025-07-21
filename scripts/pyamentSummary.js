import { cart } from "../data/cart.js";
import { products } from "../data/products.js";
import { diliveryOptions } from "../data/diliveryOptions.js";

export function renderPaymentSummary() {
    let productPriceCents = 0;
    let shippingPriceCents = 0;
    cart.forEach((cartItem) => {
        const productId = cartItem.productId;
        let matchingProduct;
        let deliveryOption;
        products.forEach((product) => {
            if (product.id === productId) {
                matchingProduct = product;
                productPriceCents += product.priceCents * cartItem.quantity;
                diliveryOptions.forEach((option) => {
                    if (cartItem.diliveryOptionid === option.id) {
                        shippingPriceCents += option.priceCent;
                    }
                })
            }
        });
    })
    const totalBeforeTax = productPriceCents + shippingPriceCents;
    const taxCents = totalBeforeTax * 0.1;
    const totalCents = totalBeforeTax + taxCents;

    let paymmentSummaryHTML =
        `
            <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${(productPriceCents / 100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${(shippingPriceCents / 100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${(totalBeforeTax / 100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${(taxCents / 100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${(totalCents / 100).toFixed(2)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>

        `
    document.querySelector('.js-payment-summary').innerHTML = paymmentSummaryHTML;

};

// Make sure to do automated tests