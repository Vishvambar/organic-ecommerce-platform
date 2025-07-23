// Product Pages to Fetch Data From 
const productPages = [
    'home.html', // Replace with actual product page URLs
    'fruits.html',
    'gift_hamper.html',
    'groceries.html',
    'snacks.html',
    'vagetable.html',
    'wholefood.html'
];

// Function to Open Modal on Search
function openModal() {
    document.getElementById("searchModal").style.display = "flex"; // Show modal
    document.getElementById("modalSearchInput").focus(); // Auto-focus inside modal search bar
}

// Function to Close Modal
function closeModal() {
    document.getElementById("searchModal").style.display = "none"; // Hide modal
}

// Function to Open Product Page
function openProductPage(event) {
    const productDiv = event.target.closest('.product-search');
    if (!productDiv) return; // Ensure click is on a valid product element

    // Extract product details
    const image = productDiv.querySelector('img')?.src;
    const name = productDiv.querySelector('p')?.textContent.trim();
    const price = productDiv.querySelector('h3')?.textContent.trim();

    if (!image || !name || !price) {
        console.error("Product details missing.");
        return;
    }

    // Prepare product object
    const product = { image, name, price };

    // Save product data to localStorage
    localStorage.setItem('selectedforproductpage', JSON.stringify(product));

    // Redirect to the product page
    window.location.href = 'product-page.html';
}

// Function to Perform Product Search (Fetching from Pages)
function performSearch() {
    const searchTerm = document.getElementById("modalSearchInput").value.toLowerCase();
    const resultsContainer = document.getElementById("searchResults");

    // Clear previous results
    resultsContainer.innerHTML = "Loading...";

    // Fetch products from all pages
    Promise.all(productPages.map(page => fetch(page).then(response => response.text())))
        .then(pagesContent => {
            const results = [];

            pagesContent.forEach(content => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(content, "text/html");
                const products = doc.querySelectorAll(".submenu"); // Adjust this selector based on your product structure

                products.forEach(product => {
                    const productDescription = product.querySelector(".textb p")?.innerText.toLowerCase();
                    const productPrice = product.querySelector(".pricesection h3")?.innerText.toLowerCase();
                    const productImage = product.querySelector("img")?.src;

                    if (!productDescription || !productPrice || !productImage) return;

                    if (productDescription.includes(searchTerm) || productPrice.includes(searchTerm)) {
                        results.push({
                            description: productDescription,
                            price: productPrice,
                            image: productImage
                        });
                    }
                });
            });

            // Display results
            resultsContainer.innerHTML = "";
            if (results.length > 0) {
                results.forEach(result => {
                    const resultElement = document.createElement("div");
                    resultElement.classList.add("product-search");
                    resultElement.innerHTML = `
                        <img src="${result.image}" alt="">
                        <div class="textb" style="display: flex; align-items: center; justify-content: center; gap: 12%;">
                            <p style="font-weight:unset; font-family:system-ui; font-size:0.9rem;">${result.description.toUpperCase()}</p>
                            <h3 style="display:none">${result.price}</h3>
                        </div>
                    `;
                    resultsContainer.appendChild(resultElement);
                });
            } else {
                resultsContainer.innerHTML = "<p>No products found.</p>";
            }
        })
        .catch(error => {
            console.error("Error fetching product pages:", error);
            resultsContainer.innerHTML = "<p>Error loading products.</p>";
        });
}

// Attach Event Delegation to Parent Container
document.getElementById("searchResults").addEventListener("click", openProductPage);
