document.addEventListener('DOMContentLoaded', function() {
    // Fetch product details from HTML
    const productImage = document.getElementById('product-image').src;
    const productTitle = document.getElementById('product-name').innerText;
    const productquantity = document.getElementById('product-quantity').innerText;
    const productPrice = parseInt(document.getElementById('product-price').innerText); // Convert to integer

    // Populate the Razorpay options
    document.getElementById('buy-now').onclick = function() {
        var options = {
            key: 'rzp_test_eRKLlG1iwA78RM', // Enter the Key ID generated from the Dashboard
            amount: productPrice, // Amount in paise
            currency: 'INR',
            name: productTitle,
            description: 'Purchase of ' + productTitle,
            image: productImage,
            handler: function (response) {
                alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
            },
            prefill: {
                name: 'Customer Name',
                email: 'customer@example.com',
                contact: '9999999999'
            },
            notes: {
                address: 'Customer Address'
            },
            theme: {
                color: '#F37254'
            }
        };

        var rzp1 = new Razorpay(options);
        rzp1.open();
        event.preventDefault();
    };
});