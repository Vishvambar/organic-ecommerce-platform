// Select elements
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const productGrid = document.getElementById('product-grid');
const categoryCards = document.querySelectorAll('.category-card');
const products = document.querySelectorAll('.product-card');

// Search Functionality
searchBtn.addEventListener('click', () => {
    const searchTerm = searchInput.value.toLowerCase();
    products.forEach(product => {
        const productName = product.querySelector('h3').textContent.toLowerCase();
        if (productName.includes(searchTerm)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
});

// Category Filter Functionality
categoryCards.forEach(categoryCard => {
    categoryCard.addEventListener('click', () => {
        const selectedCategory = categoryCard.getAttribute('data-category');
        products.forEach(product => {
            const productCategory = product.getAttribute('data-category');
            if (productCategory === selectedCategory) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    });
});
