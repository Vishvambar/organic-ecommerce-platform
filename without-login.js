

const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');



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
    window.location.href = "login.html";
});
document.getElementById('vagetables').addEventListener('click', () => {
    window.location.href = "login.html";
});
document.getElementById('wholefoods').addEventListener('click', () => {
    window.location.href = "login.html";
});
document.getElementById('snacks').addEventListener('click', () => {
    window.location.href = "login.html";
});
document.getElementById('cookingessentials').addEventListener('click', () => {
    window.location.href = "login.html";
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
    // const productDiv = event.target.closest('.submenu');

    // // Extract product details
    // const image = productDiv.querySelector('img').src;
    // const name = productDiv.querySelector('p').textContent.trim();
    // const price = productDiv.querySelector('h3').textContent.trim();

    // // Prepare product object
    // const product = { image, name, price };

    // // Save product data to localStorage
    // localStorage.setItem('selectedforproductpage', JSON.stringify(product));

    // // Redirect to the product page
    window.location.href = 'login.html';
}

document.querySelectorAll('.image-container').forEach(product => {
    product.addEventListener('click', openProductPage);
});



function addToCart() {

    window.location.href = 'login.html';
}

document.querySelectorAll('.trending-cart-icon').forEach(icon => {
    icon.addEventListener('click', addToCart);
});