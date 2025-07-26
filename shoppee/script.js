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

let cart = [];

function toggleCredentials() {
    const box = document.getElementById("credentials-box");
    box.style.display = box.style.display === "none" ? "block" : "none";
}

function renderRelatedProducts() {
    const relatedDiv = document.getElementById("related-products");
    relatedDiv.innerHTML = ""; // Clear existing content
    relatedProducts.forEach(item => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
            <div class="product-info">
                <h4>${item.name}</h4>
                <p class="product-price">₹${item.price}</p>
                <button class="add-to-cart-btn" onclick="addToCart(${item.id}, '${item.name}', ${item.price})">
                    <i class="fas fa-cart-plus"></i> Add to Cart
                </button>
            </div>
        `;
        relatedDiv.appendChild(card);
    });
}

function goHome() {
    // Clear authentication
    sessionStorage.removeItem("authenticated");
    
    // Redirect to the login page
    window.location.href = window.location.pathname;
}

window.onload = function () {
    // Initialize page in login mode
    document.querySelector(".main-container").classList.add("in-login");
    
    // Pre-load products to avoid timing issues
    displayProducts();
    renderRelatedProducts();
    
    document.getElementById("login-form").onsubmit = function (e) {
        e.preventDefault();
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        const errorMsg = document.getElementById("login-error");

        // Accept both credential sets
        if ((username === "HarshaTest" && password === "TESTMANUAL") || (username === "admin" && password === "password")) {
            // First clear the error message if it exists
            errorMsg.style.display = "none";
            
            // SIMPLIFIED APPROACH: Use a direct redirect instead of complex display toggles
            // This addresses the blank page issue by refreshing the whole view
            sessionStorage.setItem("authenticated", "true");
            
            alert("Login successful! Redirecting to cart page...");
            
            // Force a redirect to the same page with a special fragment
            window.location.href = window.location.pathname + "?view=cart#cart";
        } else {
            errorMsg.textContent = "Invalid username or password!";
            errorMsg.style.display = "block";
        }
    };

    // Check if we're returning after authentication
    if (sessionStorage.getItem("authenticated") === "true" && window.location.href.includes("view=cart")) {
        console.log("Authenticated user returning to cart view");
        
        // Hide login and info sections
        document.getElementById("login-section").style.display = "none";
        document.getElementById("checkout-section").style.display = "none";
        document.querySelector(".info-section").style.display = "none";
        
        // Show cart section with !important style overrides
        const cartSection = document.getElementById("cart-section");
        cartSection.setAttribute("style", "display: block !important; visibility: visible !important; opacity: 1 !important;");
        
        // Update main container style
        const mainContainer = document.querySelector(".main-container");
        mainContainer.classList.remove("in-login", "in-checkout");
        mainContainer.classList.add("in-cart");
        
        // Refresh data
        displayProducts();
        renderRelatedProducts();
        displayCart();
    }

    document.getElementById("showPassword").onchange = function () {
        const pwdInput = document.getElementById("password");
        pwdInput.type = this.checked ? "text" : "password";
    };

    // Event listeners for cart and checkout navigation
    document.getElementById("checkout-btn").onclick = showCheckout;
    document.getElementById("back-to-cart-btn").onclick = function() {
        // Remove checkout state
        sessionStorage.removeItem("checkoutActive");
        
        // Redirect to cart view
        window.location.href = window.location.pathname + "?view=cart#cart";
    };
  
    // Set up the pay button to complete order
    document.getElementById("pay-btn").onclick = function() {
        alert("Thank you for your purchase! Your order has been placed.");
        cart = [];
        goHome();
    };
};

function displayProducts() {
    console.log("=== displayProducts START ===");
    console.log("displayProducts called - loading", products.length, "products");
    const productsDiv = document.getElementById("products");
    console.log("Products div:", productsDiv);
    console.log("Products div exists:", !!productsDiv);
    
    if (!productsDiv) {
        alert("ERROR: Products div not found!");
        return;
    }
    
    productsDiv.innerHTML = "";
    console.log("Cleared products div");
    
    products.forEach((product, index) => {
        console.log(`Creating product ${index}: ${product.name}`);
        const item = document.createElement("div");
        item.className = "product-card";
        item.innerHTML = `
            <div class="product-info">
                <div class="product-header">
                    <h3 class="product-title">${product.name}</h3>
                    <span class="product-price">Price: ₹${product.price}</span>
                </div>
                <p class="product-desc">Premium quality ${product.name.toLowerCase()}</p>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    <i class="fas fa-cart-plus"></i> Add to Cart
                </button>
            </div>
        `;
        productsDiv.appendChild(item);
        console.log(`Added product ${product.name} to DOM`);
    });
    
    console.log("Products div innerHTML length:", productsDiv.innerHTML.length);
    console.log("=== displayProducts END ===");
}

function displayCart() {
    const cartDiv = document.getElementById("cart");
    cartDiv.innerHTML = "";

    if (cart.length === 0) {
        cartDiv.innerHTML = "<p style='text-align:center;'>🛒 Your cart is empty.</p>";
        document.getElementById("subtotal").textContent = "0";
        document.getElementById("grand-total").textContent = "0";
        return;
    }

    const table = document.createElement("table");
    table.className = "cart-table";
    table.innerHTML = `
        <thead>
            <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Remove</th>
            </tr>
        </thead>
        <tbody>
            ${cart.map(item => `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.quantity}</td>
                    <td>₹${(item.price * item.quantity).toFixed(2)}</td>
                    <td><button onclick="removeFromCart(${item.id})" class="remove-btn"><i class="fas fa-trash"></i></button></td>
                </tr>
            `).join("")}
        </tbody>
    `;
    cartDiv.appendChild(table);

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById("subtotal").textContent = subtotal.toFixed(2);
    document.getElementById("grand-total").textContent = subtotal.toFixed(2);
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId) || relatedProducts.find(p => p.id === productId);
    if (!product) return;
    
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    displayCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    displayCart();
}

// Show checkout page with cart items
function showCheckout() {
    // Store the cart state
    sessionStorage.setItem("checkoutActive", "true");
    sessionStorage.setItem("cartData", JSON.stringify(cart));
    
    // Redirect to checkout view
    window.location.href = window.location.pathname + "?view=checkout#checkout";
}
    
    const checkoutDiv = document.getElementById("checkout-items");
    checkoutDiv.innerHTML = "";
    
    if (cart.length === 0) {
        checkoutDiv.innerHTML = "<p class='empty-cart-message'>Your cart is empty. Add some items to checkout!</p>";
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
            <img src="${item.image || 'https://via.placeholder.com/60'}" alt="${item.name}">
            <div class="item-details">
                <h4>${item.name}</h4>
                <p>Quantity: ${item.quantity}</p>
            </div>
            <span class="price">₹${(item.price * item.quantity).toFixed(2)}</span>
        `;
        checkoutDiv.appendChild(itemDiv);
    });
}
