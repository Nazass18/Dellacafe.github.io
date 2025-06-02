// Initialize cart from localStorage or empty array if not exists
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
});

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }
}

// Mobile navigation toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Newsletter form submission
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        alert('Thank you for subscribing! We will keep you updated with our latest news.');
        newsletterForm.reset();
    });
}

// Add to cart functionality
function addToCart(productId, name, price) {
    try {
        if (!event || !event.target) {
            throw new Error('Event not found');
        }

        // Prevent default if it's a button click
        event.preventDefault();

        // Find existing item in cart
        const existingItem = cart.find(item => item.id === productId);
        
        // Get the menu item container and image
        const button = event.target;
        const menuItem = button.closest('.menu-item, .donut-item, .croissant-item, .cookie-item, .cake-item, .savory-item');
        
        if (!menuItem) {
            throw new Error('Menu item container not found');
        }

        const img = menuItem.querySelector('img');
        const imageSrc = img ? img.src : '';

        if (existingItem) {
            // If item exists, increment quantity
            existingItem.quantity += 1;
        } else {
            // If item doesn't exist, add new item
            cart.push({
                id: productId,
                name: name,
                price: price,
                quantity: 1,
                image: imageSrc
            });
        }

        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Update cart count
        updateCartCount();

        // Show success message
        showAddToCartMessage(name);
    } catch (error) {
        console.error('Error adding item to cart:', error);
        showErrorMessage();
    }
}

function showAddToCartMessage(itemName) {
    // Remove existing message if any
    const existingMessage = document.querySelector('.add-to-cart-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create and show new message
    const message = document.createElement('div');
    message.className = 'add-to-cart-message';
    message.textContent = `${itemName} added to cart!`;
    document.body.appendChild(message);

    // Remove message after 2 seconds
    setTimeout(() => {
        message.remove();
    }, 2000);
}

function showErrorMessage() {
    // Remove existing message if any
    const existingMessage = document.querySelector('.add-to-cart-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create and show error message
    const message = document.createElement('div');
    message.className = 'add-to-cart-message error';
    message.textContent = 'Failed to add item to cart. Please try again.';
    document.body.appendChild(message);

    // Remove message after 2 seconds
    setTimeout(() => {
        message.remove();
    }, 2000);
}

// Intersection Observer for fade-in animations
const fadeElements = document.querySelectorAll('.fade-in');
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

fadeElements.forEach(element => {
    element.style.opacity = 0;
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    fadeObserver.observe(element);
});

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
}); 