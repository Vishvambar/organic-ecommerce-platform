import { auth } from './firebase-init.js';

document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.querySelector('.logout'); // Logout button
    const animationContainer = document.querySelector('.logout-animation'); // Animation container

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            // Show the animation
            animationContainer.classList.add('active');

            // Sign out the user
            auth.signOut()
                .then(() => {
                    console.log("Signout Success");

                    // Clear user data
                    clearBrowserData();

                    // Keep animation for 2 seconds, then redirect
                    setTimeout(() => {
                        animationContainer.classList.remove('active'); // Remove animation
                        window.location.href = "login.html"; // Redirect to login
                    }, 2000); // Delay for animation
                })
                .catch((error) => {
                    console.error("Error signing out:", error);

                    // Hide the animation in case of an error
                    animationContainer.classList.remove('active');
                });
        });
    }

    // Function to clear all user data from the browser
    function clearBrowserData() {
        localStorage.clear();
        sessionStorage.clear();
        document.cookie.split(";").forEach((cookie) => {
            const cookieName = cookie.split("=")[0].trim();
            document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
        });
        console.log("All user data cleared from the browser.");
    }
    document.addEventListener('DOMContentLoaded', () => {
        const ordersSection = document.querySelector('.orders-list');

        // Retrieve orders from local storage
        const orders = JSON.parse(localStorage.getItem('orders')) || [];

        if (orders.length === 0) {
            ordersSection.innerHTML = "<p>No orders found.</p>";
        } else {
            orders.forEach((order, index) => {
                const orderItem = document.createElement('li');
                orderItem.innerHTML = `
                <div class="img-container">
                    <img src="${order.image}" alt="${order.name}">
                </div>
                <div class="order-info">
                    <h3>Order #${index + 1}</h3>
                    <p>Date: ${order.date}</p>
                    <p>Total: ${order.price}</p>
                    <p>Quantity: ${order.quantity}</p>
                    <p>Status: <span class="status">${order.status}</span></p>
                </div>
            `;
                ordersSection.appendChild(orderItem);
            });
        }
    });





    const ordersSection = document.querySelector('.orders-list');

    // Retrieve orders from local storage
    const orders = JSON.parse(localStorage.getItem('orders')) || [];

    if (orders.length === 0) {
        ordersSection.innerHTML = "<p>No orders found.</p>";
    } else {
        orders.forEach((order, index) => {
            const orderItem = document.createElement('li');
            orderItem.innerHTML = `
                <div class="img-container">
                    <img src="${order.image}" alt="${order.name}">
                </div>
                <div class="order-info">
                    <h3>Order #${index + 1}</h3>
                    <p>Date: ${order.date}</p>
                    <p>Total: ${order.price}</p>
                    <p>Quantity: ${order.quantity}</p>
                                   <p>Status: <span class="status">${order.status}</span></p>
                </div>
            `;
            ordersSection.appendChild(orderItem);
        });
    }
});


document.querySelector('.status').addEventListener('click', () => {
    window.location.href = "track-order.html";
});
