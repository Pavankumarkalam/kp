// Debug script to help find issues with images
window.addEventListener('DOMContentLoaded', () => {
    console.log('Debug script loaded');
    
    // Create debugging panel
    const debugPanel = document.createElement('div');
    debugPanel.style.position = 'fixed';
    debugPanel.style.bottom = '10px';
    debugPanel.style.right = '10px';
    debugPanel.style.backgroundColor = 'rgba(0,0,0,0.8)';
    debugPanel.style.color = '#00ff00';
    debugPanel.style.padding = '10px';
    debugPanel.style.borderRadius = '5px';
    debugPanel.style.zIndex = '9999';
    debugPanel.style.fontSize = '12px';
    debugPanel.style.maxWidth = '300px';
    debugPanel.style.maxHeight = '200px';
    debugPanel.style.overflow = 'auto';
    debugPanel.innerHTML = '<h3>Image Debug Panel</h3><div id="debug-content"></div>';
    document.body.appendChild(debugPanel);
    
    // Helper function to log to our debug panel
    function logDebug(message) {
        const debugContent = document.getElementById('debug-content');
        const logEntry = document.createElement('div');
        logEntry.textContent = message;
        debugContent.appendChild(logEntry);
        console.log(message);
    }
    
    // Monitor image loading
    document.querySelectorAll('img').forEach((img, index) => {
        logDebug(`Found image ${index}: ${img.src}`);
        
        img.addEventListener('load', () => {
            logDebug(`Image loaded: ${img.src}`);
        });
        
        img.addEventListener('error', () => {
            logDebug(`Image failed: ${img.src}`);
            
            // Try to fix banana image if it fails
            if (img.src.includes('banana')) {
                logDebug('Attempting to fix banana image...');
                // Try different paths
                const paths = [
                    './images/fruits/banana.jpg',
                    '/images/fruits/banana.jpg',
                    'images/fruits/banana.jpg',
                    '../images/fruits/banana.jpg'
                ];
                
                let pathIndex = 0;
                const tryNextPath = () => {
                    if (pathIndex < paths.length) {
                        const newPath = paths[pathIndex];
                        logDebug(`Trying path: ${newPath}`);
                        img.src = newPath;
                        pathIndex++;
                        // If this path fails, try the next one
                        img.onerror = tryNextPath;
                    } else {
                        // If all paths fail, use a placeholder
                        logDebug('All paths failed, using placeholder');
                        img.src = 'https://via.placeholder.com/60/00e5ff/FFFFFF?text=Banana';
                    }
                };
                
                // Start trying alternative paths
                tryNextPath();
            }
        });
    });
    
    // Monitor cart display
    const originalDisplayCart = window.displayCart;
    if (originalDisplayCart) {
        window.displayCart = function() {
            logDebug('displayCart called');
            originalDisplayCart.apply(this, arguments);
            
            // Check images after rendering
            setTimeout(() => {
                document.querySelectorAll('.cart-item-image img').forEach((img, index) => {
                    logDebug(`Cart image ${index}: ${img.src}`);
                });
            }, 100);
        };
    }
    
    // Monitor checkout initialization
    const originalInitCheckout = window.initializeCheckout;
    if (originalInitCheckout) {
        window.initializeCheckout = function() {
            logDebug('initializeCheckout called');
            originalInitCheckout.apply(this, arguments);
            
            // Check images after rendering
            setTimeout(() => {
                document.querySelectorAll('.checkout-item-image').forEach((img, index) => {
                    logDebug(`Checkout image ${index}: ${img.src}`);
                });
            }, 100);
        };
    }
    
    logDebug('Debug initialization complete');
});
