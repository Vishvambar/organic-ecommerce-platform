

const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');

// Listen for click events on all "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', function () {
    // Get product details from the clicked product
    const productItem = this.closest('.product-item');
    const productName = productItem.querySelector('p').textContent;
    const productPrice = productItem.querySelector('.discount-price').textContent;
    const productImage = productItem.querySelector('img').src; // Get the product image URL

    // Create product object
    const product = {
      name: productName,
      price: productPrice,
      image: productImage, // Add the image to the product object
      quantity: 1 // default to 1 when added to cart
    };

    // Get existing cart from localStorage or create a new one
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the product is already in the cart
    const existingProductIndex = cart.findIndex(item => item.name === productName);

    if (existingProductIndex !== -1) {
      // If product exists, increase the quantity
      cart[existingProductIndex].quantity += 1;
    } else {
      // Add new product to the cart
      cart.push(product);
    }

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    alert(`${productName} has been added to your cart!`);
  });
});


const countdown = () => {
  const now = new Date().getTime();
  const targetDate = new Date('2024-09-29T00:00:00').getTime();
  const difference = targetDate - now;

  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

  // Pad single-digit hours and minutes with a leading zero
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  hoursElement.textContent = formattedHours;
  minutesElement.textContent = formattedMinutes;
};

setInterval(countdown, 1000);

const videosContainer = document.getElementById('videos');
const scrollAmount = 300; // Adjust the scroll amount as needed

document.getElementById('scroll-left').addEventListener('click', () => {
  videosContainer.scrollBy({
    left: -scrollAmount,
    behavior: 'smooth'
  });
});

document.getElementById('scroll-right').addEventListener('click', () => {
  videosContainer.scrollBy({
    left: scrollAmount,
    behavior: 'smooth'
  });
});

document.getElementById('gift_hamper').addEventListener('click', () => {
  window.location.href = "gift_hamper.html";
});
document.getElementById('fruits').addEventListener('click', () => {
  window.location.href = "fruits.html";
});
document.getElementById('vagetables').addEventListener('click', () => {
  window.location.href = "vagetable.html";
});
document.getElementById('wholefoods').addEventListener('click', () => {
  window.location.href = "wholefood.html";
});
document.getElementById('snacks').addEventListener('click', () => {
  window.location.href = "snacks.html";
});
document.getElementById('cookingessentials').addEventListener('click', () => {
  window.location.href = "groceries.html";
});

const track = document.querySelector('.carousel-track');
const images = document.querySelectorAll('.carousel img');
const leftButton = document.querySelector('.carousel-button.left');
const rightButton = document.querySelector('.carousel-button.right');

let currentIndex = 0;
const totalImages = images.length;

function updateCarousel() {
  const width = images[0].clientWidth;
  track.style.transform = `translateX(-${currentIndex * width}px)`;
}

function nextImage() {
  currentIndex = (currentIndex + 1) % totalImages;
  updateCarousel();
}

function prevImage() {
  currentIndex = (currentIndex - 1 + totalImages) % totalImages;
  updateCarousel();
}

let autoScroll = setInterval(nextImage, 4000);

leftButton.addEventListener('click', () => {
  clearInterval(autoScroll);
  prevImage();
  autoScroll = setInterval(nextImage, 4000);
});

rightButton.addEventListener('click', () => {
  clearInterval(autoScroll);
  nextImage();
  autoScroll = setInterval(nextImage, 4000);
});

window.addEventListener('resize', updateCarousel);

function openProductPage(event) {
  const productDiv = event.target.closest('.submenu');

  // Extract product details
  const image = productDiv.querySelector('img').src;
  const name = productDiv.querySelector('p').textContent.trim();
  const price = productDiv.querySelector('h3').textContent.trim();

  // Prepare product object
  const product = { image, name, price };

  // Save product data to localStorage
  localStorage.setItem('selectedforproductpage', JSON.stringify(product));

  // Redirect to the product page
  window.location.href = 'product-page.html';
}

document.querySelectorAll('.image-container').forEach(product => {
  product.addEventListener('click', openProductPage);
});



function addToCart(event) {
  const productDiv = event.target.closest('.submenu');

  // Extract product details ```javascript
  const image = productDiv.querySelector('img').src;
  const name = productDiv.querySelector('p').textContent.trim();
  const price = productDiv.querySelector('h3').textContent.trim();

  // Prepare product object
  const product = { image, name, price };

  // Get existing cart items from localStorage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Add new product to cart
  cart.push(product);

  // Save updated cart back to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));


  cartAnimation.classList.add('show', 'bounce');

  // Hide animation after 2 seconds
  setTimeout(() => {
    cartAnimation.classList.remove('show', 'bounce');
  }, 2000);
}

document.querySelectorAll('.trending-cart-icon').forEach(icon => {
  icon.addEventListener('click', addToCart);
});



