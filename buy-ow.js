// Display selected product details on the "Buy Now" page
const productData = JSON.parse(localStorage.getItem('selectedforproductpage'));

if (productData) {
    // Display product data on the page
    document.getElementById('product-image').src = productData.image;
    document.getElementById('product-name').textContent = productData.name;
    document.getElementById('product-price').textContent = productData.price;
} else {
    // Redirect to the home page if no product data is found
    alert('No product data found!');
    window.location.href = 'home.html';
}

// Function to handle the "Buy Now" button
function buyNow(event) {
    const productDiv = event.target.closest('.left-section') || event.target.closest('.submenu');
    
    // Extract product details
    const image = productDiv.querySelector('img').src;
    const name = productDiv.querySelector('h1') 
        ? productDiv.querySelector('h1').textContent.trim() 
        : productDiv.querySelector('p').textContent.trim();
    const price = productDiv.querySelector('.price') 
        ? productDiv.querySelector('.price').textContent.trim() 
        : productDiv.querySelector('h3').textContent.trim();

    // Prepare product object
    const product = { image, name, price };

    // Save product details to localStorage
    localStorage.setItem('selectedforproductpage', JSON.stringify(product));

    // Redirect to the Buy Now page
    window.location.href = 'but-now.html';
}

// Attach event listener to "Buy Now" button on the main product
const mainBuyNowButton = document.querySelector('.buy-now-container .buy-now-btn');
if (mainBuyNowButton) {
    mainBuyNowButton.addEventListener('click', buyNow);
}

// Attach event listeners to "Buy Now" buttons in related products, if applicable
document.querySelectorAll('.submenu .buy-now-btn').forEach(button => {
    button.addEventListener('click', buyNow);
});
