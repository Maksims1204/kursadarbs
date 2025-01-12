document.addEventListener('DOMContentLoaded', () => {
    const cartItemsList = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const orderButton = document.getElementById('order-button'); 
    function renderCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartItemsList.innerHTML = '';
        let totalPrice = 0;

        cart.forEach((item, index) => {
            const div = document.createElement('div');
            div.classList.add('cart-item');

            div.innerHTML = `
                <img src="${item.image || 'placeholder.png'}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>Cena: ${item.price} eur</p>
                    <p>Daudzums: ${item.quantity}</p>
                </div>
                <button class="remove-item" data-index="${index}">Noņemt</button>
            `;

            cartItemsList.appendChild(div);

            totalPrice += item.price * item.quantity;
        });

        totalPriceElement.textContent = totalPrice.toFixed(2);
        checkCart(); 
    }

    function checkCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length === 0) {
            orderButton.style.display = 'none'; 
        } else {
            orderButton.style.display = 'block'; 
        }
    }

   
    function removeItemFromCart(index) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }

   
    cartItemsList.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item')) {
            const index = e.target.dataset.index;
            removeItemFromCart(index);
        }
    });

   
    function addToCart(item) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItemIndex = cart.findIndex((cartItem) => cartItem.id === item.id);

        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += 1; 
        } else {
            cart.push(item); 
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }

    
    document.querySelectorAll('.add-to-cart').forEach((button) => {
        button.addEventListener('click', (event) => {
            const productElement = event.target.closest('.product'); 
            const productId = productElement.dataset.id; 
            const productPrice = parseFloat(productElement.dataset.price); 
            const productImage = productElement.querySelector('.product-image').src; 
            const productName = productElement.querySelector('h3').innerText; 

            const item = {
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1, 
            };

            addToCart(item); 
        });
    });

    
    renderCart();
});
