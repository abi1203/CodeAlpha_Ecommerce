let generatedOTP;

function sendOTP() {
    let phone = document.getElementById("phone").value;

    if (phone.length !== 10) {
        alert("Enter valid 10 digit number");
        return;
    }

    generatedOTP = Math.floor(1000 + Math.random() * 9000);
    alert("Demo OTP: " + generatedOTP);

    document.getElementById("otpSection").style.display = "block";
}

function verifyOTP() {
    let userOTP = document.getElementById("otp").value;

    if (userOTP == generatedOTP) {
        window.location.href = "home.html";
    } else {
        alert("Invalid OTP");
    }
}

function logout() {
    localStorage.removeItem("cart");
    window.location.href = "index.html";
}

let products = [
    { id: 1, name: "Men T-Shirt", price: 499, category: "men", img: "https://picsum.photos/200?1" },
    { id: 2, name: "Women Saree", price: 999, category: "women", img: "https://picsum.photos/200?2" },
    { id: 3, name: "Men Jeans", price: 799, category: "men", img: "https://picsum.photos/200?3" },
    { id: 4, name: "Women Kurti", price: 699, category: "women", img: "https://picsum.photos/200?4" }
];

function loadProducts() {
    displayProducts(products);
    updateCartCount();
}

function displayProducts(data) {
    let container = document.getElementById("products");
    container.innerHTML = "";

    data.forEach(product => {
        container.innerHTML += `
            <div class="card">
                <img src="${product.img}">
                <h4>${product.name}</h4>
                <p>₹${product.price}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
    });
}

function filterCategory(cat) {
    if (cat === "all") {
        displayProducts(products);
    } else {
        let filtered = products.filter(p => p.category === cat);
        displayProducts(filtered);
    }
}

function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let product = products.find(p => p.id === id);
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert("Added to cart");
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let count = document.getElementById("cartCount");
    if (count) count.innerText = cart.length;
}

function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let container = document.getElementById("cartItems");
    container.innerHTML = "";

    cart.forEach((item, index) => {
        container.innerHTML += `
            <div class="card">
                <img src="${item.img}">
                <h4>${item.name}</h4>
                <p>₹${item.price}</p>
                <button onclick="removeItem(${index})">Remove</button>
            </div>
        `;
    });
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}