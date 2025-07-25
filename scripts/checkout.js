import { cart, removeFromCart, updateDeliveryOption } from "../data/cart.js";
import { products } from "../data/products.js";
import { hello } from "https://unpkg.com/supersimpledev@1.0.1/hello.esm.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { diliveryOptions } from "../data/diliveryOptions.js";
import { renderPaymentSummary } from "./pyamentSummary.js";

let cartHTML = '';
cart.forEach((cartItem) => {
  const productId = cartItem.productId;
  let matchingItem;
  products.forEach((product) => {
    if (product.id === productId) {
      matchingItem = product;
    }
  })

  // let deliveryOptionId = cartItem.deliveryOptionId;
  let deliveryOption;
  // diliveryOptions.forEach((option) => {
  //   if (option.id === deliveryOptionId) {
  //     deliveryOption = option;
  //   }
  // })

  // let today = dayjs();
  // let deliveryDate = today.add(
  //   deliveryOption.diliveryDays,
  //   'days'
  // );
  // let dateString = deliveryDate.format(
  //   'dddd, MMMM D'
  // );
    diliveryOptions.forEach((options) => {
    const today = dayjs();
    const deliveryDate = today.add(
      options.diliveryDays,
      'days'
    );
    const dateString = deliveryDate.format(
      'dddd, MMMM D'
    );
    deliveryOption = dateString;
  })

  cartHTML += `

    <div class="cart-item-container js-cart-item-container-${matchingItem.id}">
            <div class="delivery-date">
              Delivery date: ${deliveryOption}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingItem.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingItem.name}
                </div>
                <div class="product-price">
                  $${(matchingItem.priceCents / 100).toFixed(2)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingItem.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchingItem)}
              </div>
            </div>
          </div>
    
    `;
});

function deliveryOptionsHTML(matchingItem) {
  let html = '';
  diliveryOptions.forEach((options) => {
    const today = dayjs();
    const deliveryDate = today.add(
      options.diliveryDays,
      'days'
    );
    const dateString = deliveryDate.format(
      'dddd, MMMM D'
    );
    const priceString = options.priceCent === 0
      ? 'FREE'
      : `$${(options.priceCent) / 100} -`;
    html += `
        <div class="delivery-option js-delivery-option" data-product-id="${matchingItem.id}" data-delivery-option-id="${diliveryOptions.id}">
            <input type="radio" checked
            class="delivery-option-input"
            name="delivery-option-${matchingItem.id}">
            <div>
            <div class="delivery-option-date">
                ${dateString}
            </div>
            <div class="delivery-option-price">
                ${priceString} Shi
                
                pping
            </div>
            </div>
        </div>

    `
  })
  return html;
}

document.querySelector('.js-order-summary').innerHTML = cartHTML;
// console.log(cartHTML)

document.querySelectorAll('.js-delete-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    removeFromCart(productId);

    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    //    console.log(container);
    container.remove();
  });
});

// hello();
const today = dayjs();
const deliveryDate = today.add(7, 'days');
// console.log(deliveryDate.format('dddd, MMMM D'));
document.querySelectorAll('.js-delivery-option')
  .forEach((element) => {
    element.addEventListener('click', () => {
      const {productId, deliveryOptionId} = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId)
    });
  });

  //Learning MVC

  //Payment SUmmary
  renderPaymentSummary();