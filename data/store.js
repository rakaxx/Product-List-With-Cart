document.querySelectorAll('.bi-plus-circle')
    .forEach((button) => {
        button.addEventListener('click', () => {
            const content = button.closest('.content');
            const quantitySpan = content.querySelector('#quantity');

            let quantity = parseInt(quantitySpan.textContent, 10);
            quantity += 1;
            quantitySpan.textContent = quantity;

            // Update cart if item is already in the cart
            const productName = content.querySelector('h3').innerText;
            updateCartItemQuantity(productName, quantity);
            updateCartTotal();
            updateCartQuantity();
        });
    });

document.querySelectorAll('.bi-dash-circle')
    .forEach((button) => {
        button.addEventListener('click', () => {
            const content = button.closest('.content');
            const quantitySpan = content.querySelector('#quantity');

            let quantity = parseInt(quantitySpan.textContent, 10);
            if (quantity > 0) {
                quantity -= 1;
                quantitySpan.textContent = quantity;
            }

            if (quantity === 0) {
                const hiddenButton = content.querySelector('.product-quantity-button button');
                hiddenButton.style.display = 'none';
            }

            // Update cart if item is already in the cart
            const productName = content.querySelector('h3').innerText;
            updateCartItemQuantity(productName, quantity);
            updateCartTotal();
            updateCartQuantity();
        });
    });

// Cart Total

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();   
}

function ready() {
    var itemRemove = document.getElementsByClassName('bi-x-circle');
    for (var i = 0; i < itemRemove.length; i++) {
        var button = itemRemove[i];
        button.addEventListener('click', removeCartItems);
    }
    updateCartQuantity();
}

function removeCartItems(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
    updateCartQuantity();
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('order-list')[0];
    var cartRows = cartItemContainer.getElementsByClassName('order-cart');
    var total = 0;
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var quantityElement = cartRow.getElementsByClassName('total-cart-price')[0];
        var price = parseFloat(priceElement.innerText.replace('@$', ''));
        var quantity = parseInt(quantityElement.getAttribute('value'), 10);
        total += price * quantity;
    }
    document.getElementsByClassName('total')[0].innerText = '$' + total.toFixed(2);
}

function updateCartQuantity() {
    var cartItemContainer = document.getElementsByClassName('order-list')[0];
    var cartRows = cartItemContainer.getElementsByClassName('order-cart');
    var uniqueItems = cartRows.length;
    document.querySelector('.order-section h2').innerText = `Your Cart (${uniqueItems})`;
}

// New code to add item to cart
document.querySelectorAll('.js-cart-button')
    .forEach((button) => {
        button.addEventListener('click', () => {
            const content = button.closest('.content');
            const productName = content.querySelector('h3').innerText;
            const productPrice = parseFloat(content.querySelector('.price').innerText.replace('$', ''));
            addItemToCart(productName, productPrice);
            updateCartTotal();
            updateCartQuantity();
        });
    });

// New function to add item to cart
function addItemToCart(productName, productPrice) {
    var cartItemContainer = document.getElementsByClassName('order-list')[0];
    var cartRows = cartItemContainer.getElementsByClassName('order-cart');
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var cartItemName = cartRow.getElementsByClassName('order-info')[0].getElementsByTagName('h4')[0].innerText;
        if (cartItemName === productName) {
            var quantityElement = cartRow.getElementsByClassName('total-cart-price')[0];
            var itemQuantityElement = cartRow.getElementsByClassName('item-quantity')[0];
            var quantity = parseInt(quantityElement.getAttribute('value'), 10);
            quantity += 1;
            quantityElement.setAttribute('value', quantity);
            quantityElement.innerText = `$${(productPrice * quantity).toFixed(2)}`;
            itemQuantityElement.innerText = `${quantity}x`;
            return;
        }
    }
    var cartItemWrapper = document.createElement('div');
    cartItemWrapper.classList.add('cart-item-wrapper');
    
    var cartRow = document.createElement('div');
    cartRow.classList.add('order-cart');
    var cartRowContents = `
        <div class="order-info">
            <h4>${productName}</h4>
            <span class="item-quantity" style="color: orangered; font-weight: bold;">1x</span>
            <span class="cart-price">@$${productPrice.toFixed(2)}</span>
            <span class="total-cart-price" style="font-weight: 600;" value="1">$${productPrice.toFixed(2)}</span>
        </div>
        <div>
            <i class="bi bi-x-circle"></i>
        </div>
    `;
    cartRow.innerHTML = cartRowContents;
    cartItemWrapper.append(cartRow);

    // Add the <hr> element after the cart row
    var hr = document.createElement('hr');
    cartItemWrapper.append(hr);

    cartItemContainer.append(cartItemWrapper);

    cartRow.getElementsByClassName('bi-x-circle')[0].addEventListener('click', removeCartItems);
}

// New function to update cart item quantity
function updateCartItemQuantity(productName, quantity) {
    var cartItemContainer = document.getElementsByClassName('order-list')[0];
    var cartRows = cartItemContainer.getElementsByClassName('order-cart');
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var cartItemName = cartRow.getElementsByClassName('order-info')[0].getElementsByTagName('h4')[0].innerText;
        if (cartItemName === productName) {
            var quantityElement = cartRow.getElementsByClassName('total-cart-price')[0];
            var itemQuantityElement = cartRow.getElementsByClassName('item-quantity')[0];
            if (quantity > 0) {
                quantityElement.setAttribute('value', quantity);
                const productPrice = parseFloat(cartRow.getElementsByClassName('cart-price')[0].innerText.replace('@$', ''));
                quantityElement.innerText = `$${(productPrice * quantity).toFixed(2)}`;
                itemQuantityElement.innerText = `${quantity}x`;
            } else {
                cartRow.remove();
            }
            return;
        }
    }
}