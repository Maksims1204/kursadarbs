document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.add-to-cart');

    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const product = e.target.closest('.product');
            const id = product.dataset.id; 
            const price = parseFloat(product.dataset.price); 
            const name = product.querySelector('h3').textContent; 
            const image = product.querySelector('.product-image').src; 

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const existingProduct = cart.find(item => item.id === id);

            if (existingProduct) {
                existingProduct.quantity += 1; 
            } else {
                cart.push({ id, name, price, image, quantity: 1 });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount(cart);
        });
    });

    function updateCartCount(cart) {
        const cartLink = document.querySelector('.cart a');
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartLink.textContent = `Cart (${totalItems})`;
    }
    updateCartCount(JSON.parse(localStorage.getItem('cart')) || []);
});
