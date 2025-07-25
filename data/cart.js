export let cart = JSON.parse(localStorage.getItem('cart'));
if(!cart) {
    cart =[{
        productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity : 1,
        diliveryOptionid : '1',
    }, {
        productId : '15b6fc6f-327a-4ec4-896f-486349e85a3d' ,
        quantity : 2 ,
        diliveryOptionid : '1',
    }];
}


export function removeFromCart(productId) {
    const newCart = [];

    cart.forEach((cartItem) => {
        if(cartItem.productId !== productId) {
            newCart.push(cartItem);
            diliveryOptionid = '1';
        }
    });

    cart = newCart;

    saveToStorage();

}  


export function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

    cart.forEach((cartItem) => {
        if(productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });

    matchingItem.diliveryOptionid = deliveryOptionId;

    saveToStorage();
}