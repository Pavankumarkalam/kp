/* Fruit images and styling for the cart page */

/* Fruit images as SVG or Base64 */
const fruitImages = {
    "Apple": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="60" height="60">
        <circle cx="50" cy="55" r="35" fill="#E41B17" />
        <path d="M50 20 Q 53 10 60 15 Q65 18 65 25" stroke="#5E4B28" fill="none" stroke-width="3" />
        <path d="M50 20 Q 47 10 40 15 Q35 18 35 25" stroke="#5E4B28" fill="none" stroke-width="3" />
        <path d="M49 18 L 49 23" stroke="#5E4B28" fill="none" stroke-width="3" />
        <path d="M42 55 Q 48 65 58 55" stroke="#fff" fill="none" stroke-width="1.5" opacity="0.3" />
    </svg>`,
    
    "Banana": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="60" height="60">
        <path d="M30 75 Q 25 55 40 40 Q 55 25 70 15 Q 75 18 65 30 Q 55 50 50 75 Q 40 80 30 75 Z" fill="#FFE135" />
        <path d="M30 75 Q 25 55 40 40 Q 55 25 70 15" stroke="#BFA700" fill="none" stroke-width="1" />
        <path d="M35 70 Q 30 50 45 35" stroke="#BFA700" fill="none" stroke-width="1" />
        <path d="M40 70 Q 35 50 50 35" stroke="#BFA700" fill="none" stroke-width="1" />
        <path d="M45 70 Q 40 50 55 35" stroke="#BFA700" fill="none" stroke-width="1" />
    </svg>`,
    
    "Orange": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="60" height="60">
        <circle cx="50" cy="50" r="35" fill="#FF8C00" />
        <circle cx="50" cy="50" r="30" fill="#FF8C00" />
        <path d="M50 20 Q 53 10 58 18" stroke="#5E4B28" fill="none" stroke-width="3" />
        <path d="M48 23 L 49 18" stroke="#5E4B28" fill="none" stroke-width="3" />
        <path d="M45 40 Q 50 45 55 40" stroke="#e67e00" fill="none" stroke-width="1.5" />
        <path d="M45 50 Q 50 55 55 50" stroke="#e67e00" fill="none" stroke-width="1.5" />
        <path d="M45 60 Q 50 65 55 60" stroke="#e67e00" fill="none" stroke-width="1.5" />
    </svg>`,
    
    "Mango": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="60" height="60">
        <path d="M50 25 Q 75 40 65 65 Q 55 85 40 75 Q 25 65 30 45 Q 35 30 50 25 Z" fill="#FFD700" />
        <path d="M50 25 Q 55 25 60 30" stroke="#e6c200" fill="none" stroke-width="1.5" />
        <path d="M50 25 Q 45 28 40 35" stroke="#e6c200" fill="none" stroke-width="1.5" />
        <path d="M50 25 L 50 20" stroke="#5E4B28" fill="none" stroke-width="3" />
        <path d="M50 20 Q 45 15 40 20" stroke="#5E4B28" fill="none" stroke-width="2" />
    </svg>`,
    
    "Grapes": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="60" height="60">
        <circle cx="40" cy="50" r="10" fill="#6B2F77" />
        <circle cx="55" cy="45" r="10" fill="#6B2F77" />
        <circle cx="45" cy="65" r="10" fill="#6B2F77" />
        <circle cx="60" cy="60" r="10" fill="#6B2F77" />
        <circle cx="52" cy="75" r="10" fill="#6B2F77" />
        <circle cx="35" cy="35" r="10" fill="#6B2F77" />
        <path d="M45 25 Q 50 15 55 25" stroke="#5E4B28" fill="none" stroke-width="2" />
        <path d="M45 25 L 50 35" stroke="#5E4B28" fill="none" stroke-width="2" />
    </svg>`,
    
    "Kiwi": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="60" height="60">
        <circle cx="50" cy="50" r="30" fill="#967969" />
        <circle cx="50" cy="50" r="25" fill="#76B947" />
        <circle cx="40" cy="40" r="3" fill="#3A3B36" />
        <circle cx="60" cy="40" r="3" fill="#3A3B36" />
        <circle cx="50" cy="50" r="3" fill="#3A3B36" />
        <circle cx="40" cy="60" r="3" fill="#3A3B36" />
        <circle cx="60" cy="60" r="3" fill="#3A3B36" />
        <circle cx="50" cy="30" r="3" fill="#3A3B36" />
        <circle cx="50" cy="70" r="3" fill="#3A3B36" />
        <circle cx="30" cy="50" r="3" fill="#3A3B36" />
        <circle cx="70" cy="50" r="3" fill="#3A3B36" />
    </svg>`,
    
    "Papaya": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="60" height="60">
        <ellipse cx="50" cy="50" rx="30" ry="25" fill="#FF9F51" />
        <circle cx="40" cy="50" r="2" fill="#3A3B36" />
        <circle cx="45" cy="45" r="2" fill="#3A3B36" />
        <circle cx="50" cy="50" r="2" fill="#3A3B36" />
        <circle cx="55" cy="45" r="2" fill="#3A3B36" />
        <circle cx="60" cy="50" r="2" fill="#3A3B36" />
        <circle cx="45" cy="55" r="2" fill="#3A3B36" />
        <circle cx="50" cy="60" r="2" fill="#3A3B36" />
        <circle cx="55" cy="55" r="2" fill="#3A3B36" />
        <path d="M50 25 Q 55 20 60 25" stroke="#5E4B28" fill="none" stroke-width="2" />
    </svg>`,
    
    "Dragon Fruit": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="60" height="60">
        <path d="M30 35 Q 50 20 70 35 Q 85 50 70 70 Q 50 85 30 70 Q 15 50 30 35 Z" fill="#FF3EA5" />
        <circle cx="40" cy="45" r="2" fill="#3A3B36" />
        <circle cx="50" cy="40" r="2" fill="#3A3B36" />
        <circle cx="60" cy="45" r="2" fill="#3A3B36" />
        <circle cx="65" cy="55" r="2" fill="#3A3B36" />
        <circle cx="60" cy="65" r="2" fill="#3A3B36" />
        <circle cx="50" cy="70" r="2" fill="#3A3B36" />
        <circle cx="40" cy="65" r="2" fill="#3A3B36" />
        <circle cx="35" cy="55" r="2" fill="#3A3B36" />
        <path d="M30 35 Q 40 25 45 20" stroke="#76B947" fill="none" stroke-width="2" />
        <path d="M70 35 Q 60 25 55 20" stroke="#76B947" fill="none" stroke-width="2" />
    </svg>`
};

// Function to get fruit image for a product
function getFruitImage(name) {
    return fruitImages[name] || `<div class="fruit-placeholder">${name.charAt(0)}</div>`;
}

// Function to insert fruit images into the DOM
function initFruitImages() {
    // Add fruit images to products in the list
    document.querySelectorAll('.product-card').forEach(card => {
        const title = card.querySelector('.product-title') || card.querySelector('h4');
        if (title) {
            const fruitName = title.textContent.trim();
            const imgContainer = document.createElement('div');
            imgContainer.className = 'fruit-image-container';
            imgContainer.innerHTML = getFruitImage(fruitName);
            card.insertBefore(imgContainer, card.firstChild);
        }
    });
    
    // Add fruit images to cart items
    document.querySelectorAll('.cart-table tbody tr').forEach(row => {
        const fruitName = row.cells[0].textContent.trim();
        const imageCell = document.createElement('td');
        imageCell.className = 'fruit-image-cell';
        imageCell.innerHTML = getFruitImage(fruitName);
        
        // Replace the text cell with image + text cell
        const nameCell = row.cells[0];
        nameCell.innerHTML = '';
        nameCell.appendChild(imageCell);
        nameCell.appendChild(document.createTextNode(fruitName));
    });
}

// Run when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initFruitImages();
});

// Run when cart is updated
function updateFruitImages() {
    setTimeout(initFruitImages, 100);
}
