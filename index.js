const fs = require('fs');
const XMLHttpRequest = require('xhr2');
const axios = require('axios');

function saveCartToFile(cartData) {
    const today = new Date();
    const date = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
    const fileName = `cart-${date}.js`;

    fs.writeFile(fileName, JSON.stringify(cartData, null, 2), (err) => {
        if (err) throw err;
        console.log(`Cart saved to ${fileName}`);
    });
}

function getCartWithXMLHttpRequest() {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => xhr.status === 200 ? saveCartToFile(JSON.parse(xhr.responseText)) : console.error('Failed to fetch cart data');
    xhr.onerror = () => console.error('Request error');
    xhr.open("GET", "https://dummyjson.com/carts", true);
    xhr.send();
}
// getCartWithXMLHttpRequest();
async function getCartWithFetch() {
    try {
        const response = await fetch('https://dummyjson.com/carts');
        if (!response.ok) throw new Error('Failed to fetch cart data');
        
        const cartData = await response.json();
        saveCartToFile(cartData);
    } catch (error) {
        console.error(error);
    }
}
// getCartWithFetch();
async function getCartWithAxios() {
    try {
        const response = await axios.get('https://dummyjson.com/carts');
        saveCartToFile(response.data);
    } catch (error) {
        console.error('Failed to fetch cart data', error);
    }
}
// getCartWithAxios();


