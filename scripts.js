import data from './data.js'

// link elements to DOM:
const itemsContainer = document.querySelector('#items');
const itemList = document.getElementById('item-list');
const cartQty = document.querySelector('#cart-qty');
const cartTotal = document.querySelector('#cart-total');

// create items from data.js:
for (let i = 0; i < data.length; i += 1) {
    const newDiv = document.createElement('div');
    newDiv.className = 'item'
    const img = document.createElement('img');
    img.src = data[i].image
    img.width = 300
    img.height = 300
    newDiv.appendChild(img)
    console.log(img)
    itemsContainer.appendChild(newDiv)
    const desc = document.createElement('p');
    desc.innerText = data[i].desc
    newDiv.appendChild(desc)
    const price = document.createElement('p');
    price.innerText = data[i].price
    newDiv.appendChild(price)
    const button = document.createElement('button');
    button.id = data[i].name
    button.dataset.price = data[i].price
    button.innerHTML = "Add to Cart"
    newDiv.appendChild(button)
}

const cart = [];

// Add item: 
function addItem(name, price) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].name === name) {
            cart[i].qty++;
            return
        }
    }
    const item = { name, price, qty: 1 }
    cart.push(item);
}

// Show item with total amount:
function showItems() {
    console.log(`You have ${getQty()} items in your cart.`);
    // I was confused that I had to place output in smaller dom elements within:
    // ex: cartTotal.innerHTML = `<p>...</p>` because we did that for itemStr.
    cartQty.innerHTML = `You have ${getQty()} items in your cart.`

    let itemStr = '';
    for (let i = 0; i < cart.length; i++) {
        //console.log(`${cart[i].name} $${cart[i].price} x ${cart[i].qty}`)
        // Setting more concise variables for string interpolating lines 56-59:
        // const name = cart[i].name;
        // const price = cart[i].price;
        // const qty = cart[i].qty;
        // const total = price * qty;

        // Using object key names for sting interpolating (quicker) line 63:
        //{ name: 'Apple', price: 0.99, qty: 3 }
        const { name, price, qty } = cart[i]

        itemStr += `<li>${name} $${price} x ${qty} = $${price} * ${qty}</li>`
    }
    itemList.innerHTML = itemStr;

    console.log(`Cart total is: $${getTotal()}.`)
    // I was confused that I had to place output in smaller dom elements within:
    // ex: cartTotal.innerHTML = `<p>...</p>` because we did that for itemStr.
    cartTotal.innerHTML = `Cart total is: $${getTotal()}.`
}

// Get item quntatity: 
function getQty() {
    let qty = 0;
    for (let i = 0; i < cart.length; i++) {
        qty += cart[i].qty
    }
    return qty
}

// Get total amount:
function getTotal() {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        total += cart[i].price * cart[i].qty
    }
    return total.toFixed(2)
}

// Remove item: 
function removeItem(name, qty = 0) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].name === name) {
            if (qty > 0) {
                cart[i].qty--
            }
            if (cart[i].qty < 1 || qty === 0) {
                cart.splice(i, 1)
            }
            //cart.splice(i, 1);
            return
        }
    }
}

// Function testing: 
addItem('Apple', 0.99);
addItem('Orange', 1.29);
addItem('Opinion', 0.02);
addItem('Apple', 0.99);
addItem('Frisbee', 9.99);
addItem('Apple', 0.99);
addItem('Orange', 1.29);
showItems();
removeItem('Apple', 1);
removeItem('Frisbee');
showItems();