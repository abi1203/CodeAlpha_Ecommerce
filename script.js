let products = [
    { id: 1, name: "T-Shirt", price: 300, category: "fashion", img: "https://via.placeholder.com/150" },
    { id: 2, name: "Saree", price: 800, category: "fashion", img: "https://via.placeholder.com/150" },
    { id: 3, name: "Headphones", price: 1200, category: "electronics", img: "https://via.placeholder.com/150" },
    { id: 4, name: "Phone", price: 10000, category: "electronics", img: "https://via.placeholder.com/150" }
];

let cart = [];

// LOGIN
function login() {
    document.getElementById("login").style.display = "none";
    document.getElementById("main").style.display = "block";
}

// DISPLAY PRODUCTS
function displayProducts(list = products) {
    const container = document.getElementById("products");
    container.innerHTML = "";

    list.forEach(p => {
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `
            <img src="${p.img}">
            <h3>${p.name}</h3>
            <p>₹${p.price}</p>
            <button onclick="addToCart(${p.id})">Add</button>
        `;
        container.appendChild(div);
    });
}

// ADD TO CART
function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    displayCart();
}

// DISPLAY CART
function displayCart() {
    const cartList = document.getElementById("cart");
    const totalDisplay = document.getElementById("total");

    cartList.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        total += item.price;

        const li = document.createElement("li");
        li.innerText = item.name + " - ₹" + item.price;
        cartList.appendChild(li);
    });

    totalDisplay.innerText = "Total: ₹" + total;
}

// SEARCH
function searchProduct() {
    const value = document.getElementById("search").value.toLowerCase();
    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(value)
    );
    displayProducts(filtered);
}

// CATEGORY FILTER
function filterCategory(cat) {
    if (cat === "all") {
        displayProducts();
    } else {
        const filtered = products.filter(p => p.category === cat);
        displayProducts(filtered);
    }
}

// ORDER
function placeOrder() {
    alert("Order placed successfully!");
    cart = [];
    displayCart();
}

// LOGOUT
function logout() {
    location.reload();
}

displayProducts();
let generatedOTP = "";

// SEND OTP
function sendOTP() {
    const phone = document.getElementById("phone").value;
    const msg = document.getElementById("msg");

    if (phone.length !== 10) {
        msg.innerText = "Enter valid phone number";
        return;
    }

    generatedOTP = Math.floor(1000 + Math.random() * 9000);

    alert("Your OTP is: " + generatedOTP);

    document.getElementById("otpBox").style.display = "block";
    msg.innerText = "OTP sent!";
}

// VERIFY OTP
function verifyOTP() {
    const userOTP = document.getElementById("otp").value;
    const msg = document.getElementById("msg");

    if (userOTP == generatedOTP) {
        msg.innerText = "Login successful ✅";

        document.getElementById("login").style.display = "none";
        document.getElementById("main").style.display = "block";
    } else {
        msg.innerText = "Wrong OTP ❌";
    }
}
