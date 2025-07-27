const relatedProducts = [
    { id: 101, name: "Kiwi", price: 40 },
    { id: 102, name: "Papaya", price: 30 },
    { id: 103, name: "Dragon Fruit", price: 80 }
];

const products = [
    { id: 1, name: "Apple", price: 20 },
    { id: 2, name: "Banana", price: 10 },
    { id: 3, name: "Orange", price: 15 },
    { id: 4, name: "Mango", price: 25 },
    { id: 5, name: "Grapes", price: 30 }
];

// Initialize cart
let cart = [];

// Helper function to get product images
function getProductImage(productName) {
    // Default image paths based on product name
    const imagePaths = {
        'Apple': 'images/apple.png',
        'Banana': './images/fruits/banana.jpg',  // Updated with relative path
        'Orange': 'images/orange.png',
        'Mango': 'images/mango.png',
        'Grapes': 'images/grapes.png',
        'Kiwi': 'images/kiwi.png',
        'Papaya': 'images/papaya.png',
        'Dragon Fruit': 'images/dragonfruit.png'
    };
    
    console.log('Getting image for product:', productName);
    console.log('Image path:', imagePaths[productName] || 'default.png');
    
    // If we have a specific image, return it, otherwise use a placeholder with the product name
    return imagePaths[productName] || `https://via.placeholder.com/150/00e5ff/FFFFFF?text=${encodeURIComponent(productName)}`;
}

// Try to load cart from sessionStorage
function loadCartFromSession() {
    const savedCart = sessionStorage.getItem('cartData');
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
        } catch(e) {
            console.error("Error loading cart from session:", e);
            cart = [];
        }
    }
}

// Save cart to sessionStorage
function saveCartToSession() {
    sessionStorage.setItem('cartData', JSON.stringify(cart));
}

// Toggle credentials box visibility
function toggleCredentials() {
    const box = document.getElementById("credentials-box");
    box.style.display = box.style.display === "none" ? "block" : "none";
}

// Render related products
function renderRelatedProducts() {
    console.log("Rendering related products");
    const relatedDiv = document.getElementById("related-products");
    if (!relatedDiv) {
        console.error("Related products div not found!");
        return;
    }
    relatedDiv.innerHTML = "";
    
    relatedProducts.forEach(item => {
        const card = document.createElement("div");
        card.className = "product-card related-card";
        
        // Get image for the fruit
        const imagePath = getProductImage(item.name);
        
        card.innerHTML = `
            <div class="product-image-container">
                <img src="${imagePath}" alt="${item.name}" class="product-image">
            </div>
            <div class="product-info">
                <h4>${item.name}</h4>
                <p class="product-price">₹${item.price}</p>
                <button class="add-to-cart-btn" onclick="addToCart(${item.id})">
                    <i class="fas fa-cart-plus"></i> Add to Cart
                </button>
            </div>
        `;
        relatedDiv.appendChild(card);
    });
}

// Go back to login page
function goHome() {
    // Clear authentication but keep cart data
    sessionStorage.removeItem("authenticated");
    sessionStorage.removeItem("checkoutActive");
    
    // Redirect to the login page
    window.location.href = window.location.pathname;
}

// Initialize page on load
window.onload = function () {
    console.log("Window loaded, initializing application");
    
    // First load any existing cart data
    loadCartFromSession();
    
    // Check current URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const view = urlParams.get('view');
    
    // Setup event listeners
    document.getElementById("login-form").onsubmit = function (e) {
        e.preventDefault();
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        const errorMsg = document.getElementById("login-error");

        if ((username === "HarshaTest" && password === "TESTMANUAL") || (username === "admin" && password === "password")) {
            errorMsg.style.display = "none";
            sessionStorage.setItem("authenticated", "true");
            alert("Login successful! Redirecting to cart page...");
            window.location.href = window.location.pathname + "?view=cart#cart";
        } else {
            errorMsg.textContent = "Invalid username or password!";
            errorMsg.style.display = "block";
        }
    };

    // Standard checkbox for password visibility (hidden but kept for compatibility)
    document.getElementById("showPassword").onchange = function () {
        const pwdInput = document.getElementById("password");
        pwdInput.type = this.checked ? "text" : "password";
        
        // Update the icon as well
        const icon = document.querySelector(".password-toggle i");
        if (icon) {
            icon.className = this.checked ? "fas fa-eye-slash" : "fas fa-eye";
        }
    };
    
    // New eye icon toggle for password visibility
    document.getElementById("togglePassword").onclick = function() {
        const pwdInput = document.getElementById("password");
        const checkbox = document.getElementById("showPassword");
        
        // Toggle the password field visibility
        pwdInput.type = pwdInput.type === "password" ? "text" : "password";
        
        // Keep the checkbox in sync
        checkbox.checked = pwdInput.type === "text";
        
        // Toggle the eye icon
        const icon = this.querySelector("i");
        icon.className = pwdInput.type === "text" ? "fas fa-eye-slash" : "fas fa-eye";
    };

    // Event listeners for cart and checkout navigation
    document.getElementById("checkout-btn").onclick = showCheckout;
    document.getElementById("back-to-cart-btn").onclick = function() {
        sessionStorage.removeItem("checkoutActive");
        window.location.href = window.location.pathname + "?view=cart#cart";
    };
  
    // Set up the pay button to complete order
    document.getElementById("pay-btn").onclick = function() {
        // Hide the payment button and back button
        document.getElementById("pay-btn").style.display = "none";
        document.getElementById("back-to-cart-btn").style.display = "none";
        
        // Show a loading state for 1 second
        const payBtn = document.getElementById("pay-btn");
        const originalText = payBtn.innerHTML;
        payBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        payBtn.disabled = true;
        
        // Simulate payment processing
        setTimeout(function() {
            // Show success message
            const successElement = document.getElementById("payment-success");
            successElement.style.display = "flex";
            
            // Clear cart
            cart = [];
            saveCartToSession();
            
            // After 3 seconds, redirect to home
            setTimeout(function() {
                goHome();
            }, 3000);
        }, 1500);
    };
    
    // Determine which view to show based on URL and authentication
    if (sessionStorage.getItem("authenticated") === "true") {
        if (view === "checkout" || sessionStorage.getItem("checkoutActive") === "true") {
            showCheckoutView();
        } else {
            showCartView();
        }
    } else {
        showLoginView();
    }
};

// Show the login view
function showLoginView() {
    console.log("Showing login view");
    document.querySelector(".main-container").className = "main-container in-login";
    
    document.getElementById("cart-section").style.display = "none";
    document.getElementById("checkout-section").style.display = "none";
    
    document.getElementById("login-section").style.display = "flex";
    document.querySelector(".info-section").style.display = "flex";
    
    // Ensure dark-theme stays applied when returning to login
    document.body.classList.add("dark-theme");
}

// Show the cart view
function showCartView() {
    console.log("Showing cart view");
    document.querySelector(".main-container").className = "main-container in-cart";
    
    document.getElementById("login-section").style.display = "none";
    document.getElementById("checkout-section").style.display = "none";
    
    // Completely hide the info section in cart view
    const infoSection = document.querySelector(".info-section");
    if (infoSection) {
        infoSection.style.display = "none";
        infoSection.style.visibility = "hidden";
        infoSection.style.position = "absolute";
        infoSection.style.left = "-9999px";
    }
    
    const cartSection = document.getElementById("cart-section");
    cartSection.style.display = "block";
    
    // Keep dark theme aesthetics consistent
    document.body.classList.add("dark-theme");
    
    // Populate content
    displayProducts();
    renderRelatedProducts();
    displayCart();
}

// Show the checkout view
function showCheckoutView() {
    console.log("Showing checkout view");
    document.querySelector(".main-container").className = "main-container in-checkout";
    
    document.getElementById("login-section").style.display = "none";
    document.getElementById("cart-section").style.display = "none";
    
    // Completely hide the info section in checkout view
    const infoSection = document.querySelector(".info-section");
    if (infoSection) {
        infoSection.style.display = "none";
        infoSection.style.visibility = "hidden";
        infoSection.style.position = "absolute";
        infoSection.style.left = "-9999px";
    }
    
    const checkoutSection = document.getElementById("checkout-section");
    checkoutSection.style.display = "block";
    
    // Keep dark theme aesthetics consistent
    document.body.classList.add("dark-theme");
    
    // Initialize checkout view content
    initializeCheckout();
}

// Display products
function displayProducts() {
    console.log("Displaying products");
    const productsDiv = document.getElementById("products");
    if (!productsDiv) {
        console.error("Products div not found!");
        return;
    }
    
    productsDiv.innerHTML = "";
    
    products.forEach(product => {
        const item = document.createElement("div");
        item.className = "product-card";
        
        // Get appropriate image for each fruit
        const imagePath = getProductImage(product.name);
        
        item.innerHTML = `
            <div class="product-image-container">
                <img src="${imagePath}" alt="${product.name}" class="product-image">
            </div>
            <div class="product-info">
                <div class="product-header">
                    <h3 class="product-title">${product.name}</h3>
                    <span class="product-price">₹${product.price}</span>
                </div>
                <div class="product-details">
                    <p class="product-weight">1 kg</p>
                    <p class="product-availability">In Stock</p>
                </div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    <i class="fas fa-cart-plus"></i> Add to Cart
                </button>
            </div>
        `;
        productsDiv.appendChild(item);
    });
}

// Display cart contents
function displayCart() {
    console.log("Displaying cart");
    const cartDiv = document.getElementById("cart");
    if (!cartDiv) {
        console.error("Cart div not found!");
        return;
    }
    
    cartDiv.innerHTML = "";

    if (cart.length === 0) {
        cartDiv.innerHTML = "<p style='text-align:center;'>🛒 Your cart is empty.</p>";
        document.getElementById("subtotal").textContent = "0";
        document.getElementById("grand-total").textContent = "0";
        return;
    }

    // Create modern cart items display
    cart.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        
        cartItem.innerHTML = `
            <div class="cart-item-details">
                <h4 class="cart-item-name">${item.name}</h4>
                <p class="cart-item-price">₹${item.price} per kg</p>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn minus" onclick="updateQuantity(${item.id}, -1)">-</button>
                <span class="quantity-value">${item.quantity}</span>
                <button class="quantity-btn plus" onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
            <div class="cart-item-total">
                ₹${(item.price * item.quantity).toFixed(2)}
            </div>
            <button onclick="removeFromCart(${item.id})" class="remove-btn">
                <i class="fas fa-trash"></i>
            </button>
        `;
        cartDiv.appendChild(cartItem);
    });

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById("subtotal").textContent = subtotal.toFixed(2);
    document.getElementById("grand-total").textContent = subtotal.toFixed(2);
}

// Add item to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId) || relatedProducts.find(p => p.id === productId);
    if (!product) return;
    
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    // Save cart to session
    saveCartToSession();
    displayCart();
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCartToSession();
    displayCart();
}

// Update item quantity in cart
function updateQuantity(productId, change) {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity += change;
        
        // Don't allow quantity less than 1
        if (cartItem.quantity < 1) {
            cartItem.quantity = 1;
        }
        
        saveCartToSession();
        displayCart();
    }
}

// Show checkout page
function showCheckout() {
    sessionStorage.setItem("checkoutActive", "true");
    saveCartToSession();
    window.location.href = window.location.pathname + "?view=checkout#checkout";
}

// Initialize checkout page
function initializeCheckout() {
    console.log("Initializing checkout");
    const checkoutDiv = document.getElementById("checkout-items");
    if (!checkoutDiv) {
        console.error("Checkout items div not found!");
        return;
    }
    
    checkoutDiv.innerHTML = "";
    
    if (cart.length === 0) {
        checkoutDiv.innerHTML = "<p class='empty-cart-message'>Your cart is empty. Add some items to checkout!</p>";
        document.getElementById("checkout-subtotal").textContent = "0";
        document.getElementById("checkout-shipping").textContent = "0";
        document.getElementById("checkout-total").textContent = "0";
        return;
    }
    
    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal > 0 ? 50 : 0; // ₹50 shipping fee if cart is not empty
    const total = subtotal + shipping;
    
    // Update the checkout summary values
    document.getElementById("checkout-subtotal").textContent = subtotal.toFixed(2);
    document.getElementById("checkout-shipping").textContent = shipping.toFixed(2);
    document.getElementById("checkout-total").textContent = total.toFixed(2);
    
    // Create checkout item elements
    cart.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "checkout-item";
        
        itemDiv.innerHTML = `
            <div class="item-details">
                <h4>${item.name}</h4>
                <p>Quantity: <strong>${item.quantity}</strong> × ₹${item.price}</p>
            </div>
            <span class="price">₹${(item.price * item.quantity).toFixed(2)}</span>
        `;
        checkoutDiv.appendChild(itemDiv);
    });
}
