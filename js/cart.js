// Cart functionality
document.addEventListener('DOMContentLoaded', () => {
    updateCartDisplay();
});

function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const emptyCartMessage = document.getElementById('emptyCartMessage');
    const cartContainer = document.querySelector('.cart-container');

    // Get cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        emptyCartMessage.style.display = 'block';
        cartContainer.style.display = 'none';
        return;
    }

    emptyCartMessage.style.display = 'none';
    cartContainer.style.display = 'grid';
    
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        // Use the stored image path or fallback to a default image
        const imagePath = item.image || `images/${item.id.split('-')[0]}s/${item.id}.jpg`;
        
        cartItem.innerHTML = `
            <img src="${imagePath}" alt="${item.name}" onerror="this.src='images/placeholder.jpg'">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p class="cart-item-price">Rp ${formatPrice(item.price)}</p>
                <div class="quantity-controls">
                    <button onclick="updateQuantity('${item.id}', -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity('${item.id}', 1)">+</button>
                </div>
            </div>
            <button class="remove-item" onclick="removeItem('${item.id}')">
                <i class="fas fa-trash"></i>
            </button>
        `;
        cartItems.appendChild(cartItem);
    });

    updateSummary();
}

function updateQuantity(itemId, change) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(item => item.id === itemId);
    if (item) {
        item.quantity = Math.max(1, item.quantity + change);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
        updateCartCount();
    }
}

function removeItem(itemId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    updateCartCount();
}

function updateSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;

    document.getElementById('subtotal').textContent = `Rp ${formatPrice(subtotal)}`;
    document.getElementById('tax').textContent = `Rp ${formatPrice(tax)}`;
    document.getElementById('total').textContent = `Rp ${formatPrice(total)}`;
}

function formatPrice(price) {
    return Math.round(price).toLocaleString('id-ID');
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }
}

// Checkout functionality
document.getElementById('checkoutButton').addEventListener('click', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert('Your cart is empty. Please add items before checking out.');
        return;
    }

    // Here you would typically integrate with a payment gateway
    alert('Thank you for your order! This is a demo, so no actual payment will be processed.');
    
    // Clear the cart after successful checkout
    localStorage.removeItem('cart');
    updateCartDisplay();
    updateCartCount();
}); 