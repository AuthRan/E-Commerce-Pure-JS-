// This is backed study area for my E-commerce Project Website
/* 
XMLHttpRequest() : It is a built in class to send HTML request  

*/

const xhr = new XMLHttpRequest();

xhr.addEventListener('load', () => {
    console.log(xhr.response);
})
xhr.open('GET', 'https://supersimplebackend.dev/products/first');
xhr.send();
