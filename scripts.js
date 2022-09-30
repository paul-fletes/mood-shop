import data from './data.js'

const itemsContainer = document.querySelector('#items')

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

function showItems() {
    console.log(`You have ${getQty()} items in your cart.`);

    for (let i = 0; i < cart.length; i++) {
        console.log(`${cart[i].name} $${cart[i].price} x ${cart[i].qty}`)
    }

    console.log(`Cart total is: $${getTotal()}.`)
}

function getQty() {
    let qty = 0;
    for (let i = 0; i < cart.length; i++) {
        qty += cart[i].qty
    }
    return qty
}

function getTotal() {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        total += cart[i].price * cart[i].qty
    }
    return total.toFixed(2)
}

addItem('Apple', 0.99);
addItem('Orange', 1.29);
addItem('Opinion', 0.02);
addItem('Apple', 0.99);
addItem('Frisbee', 9.99);
addItem('Apple', 0.99);
addItem('Orange', 1.29);
showItems();