// Image path fixer utility
(function() {
    console.log('Image path fixer loaded');
    
    // Function to create a reliable path to an image
    window.getReliableImagePath = function(imagePath) {
        // Strip any leading slashes or ./ for consistency
        let cleanPath = imagePath.replace(/^\.\/|^\//, '');
        
        // Special case for banana image
        if (cleanPath.includes('banana')) {
            return './images/fruits/banana.jpg';
        }
        
        return cleanPath;
    };
    
    // Patch the getProductImage function
    const originalGetProductImage = window.getProductImage;
    if (originalGetProductImage) {
        window.getProductImage = function(productName) {
            const imagePath = originalGetProductImage(productName);
            console.log(`Original image path for ${productName}: ${imagePath}`);
            
            // If it's a banana, make sure we use our reliable path
            if (productName === 'Banana') {
                return getReliableImagePath(imagePath);
            }
            
            return imagePath;
        };
    }
    
    // Check and fix any existing images on the page
    function fixBananaImages() {
        document.querySelectorAll('img').forEach(img => {
            if (img.src.includes('banana')) {
                img.src = './images/fruits/banana.jpg';
                console.log('Fixed banana image:', img);
            }
        });
    }
    
    // Wait for DOM content loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fixBananaImages);
    } else {
        fixBananaImages();
    }
    
    // Also run when images might be added dynamically
    setInterval(fixBananaImages, 1000);
    
})();
