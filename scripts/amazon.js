import {cart, saveToStorage} from '../data/cart.js'
import { products } from '../data/products.js';

let productsHTML = '';

products.forEach((product) => {
  productsHTML += `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id ='${product.id}'>
            Add to Cart
          </button>
        </div>
    `
})

document.querySelector('.js-products-grid')
  .innerHTML = productsHTML;



document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      let matchingItem;
      cart.forEach((item) => {
        if (item.productId === productId) {
          matchingItem = item;
        }
      })
      if (matchingItem) {
        matchingItem.quantity++;
      } else {
        cart.push({
          productId: productId,
          quantity: 1
        })
      }

      let cartQuantity = 0;
      cart.forEach((item)=>{
        cartQuantity += item.quantity;
      })
      document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
      saveToStorage();
    })
 
 
  // We created this to understand the array we are creating Hehe smjh jana yrr if man kare
  // const products = [{
  //     image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
  //     name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
  //     rating: {
  //         stars: 4.5,
  //         count: 87
  //     },
  //     priceCent: 1090
  // }, {
  //     image: 'images/products/intermediate-composite-basketball.jpg',
  //     name: 'Intermediate Size Basketball',
  //     rating: {
  //         stars: 4,
  //         count: 127
  //     },
  //     priceCent: 2095
  // }, {
  //     image: 'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
  //     name: 'Adults Plain Cotton T-Shirt - 2 Pack',
  //     rating: {
  //         stars: 4.5,
  //         count: 56
  //     },
  //     priceCent: 799
  
  // }, {
  //     image: 'images/products/black-2-slot-toaster.jpg',
  //     name: '2 Slot Toaster - Black',
  //     rating: {
  //         stars: 5,
  //         count: 2197
  //     },
  //     priceCent: 1899
  // }];
  
  })