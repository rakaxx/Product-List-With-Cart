let productsHTML = '';

products.forEach((product) => {
    productsHTML += `
                <div class="content">
                    <div class="picture-button">
                        <img src="${product.image}" alt="product.jpg">
                        <div>
                            <button data-product-name="${product.product_name}" class="js-cart-button"><i class="bi bi-cart-plus"></i> Add To Cart</button>
                        </div>
                        <div class="product-quantity-button">
                            <button><i class="bi bi-dash-circle" data-product-name="${product.product_name}"></i><span id="quantity">0</span><i class="bi bi-plus-circle" data-product-name="${product.product_name}"></i></button>
                        </div>
                    </div>
                    <div class="product-information">
                        <h4>${product.sub_product}</h4>
                        <h3>${product.product_name}</h3>
                        <h3 class="price">$${(product.price / 100).toFixed(2)}</h3>
                    </div>
                </div>`;
});

document.querySelector('.js-product-section')
    .innerHTML = productsHTML;

    document.querySelectorAll('.js-cart-button')
    .forEach((button) => {
        button.addEventListener('click', () => {
            const content = button.closest('.content');
            const hiddenButton = content.querySelector('.product-quantity-button button');
            const quantitySpan = content.querySelector('#quantity');

            let quantity = parseInt(quantitySpan.textContent, 10);
            quantity += 1;
            quantitySpan.textContent = quantity;

            if (quantity > 0) {
                hiddenButton.style.display = 'flex';
            }
        });
    });

        cartItemContainer.append(cartRow);