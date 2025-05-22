const cart = [];
const cartSidebar = document.getElementById("cartSidebar");
const cartBtn = document.getElementById("cartBtn");
const closeCartBtn = document.getElementById("closeCartBtn");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const checkoutBtn = document.querySelector(".checkout-btn");

// Toggle cart sidebar
function toggleBodyScroll(disable) {
  document.body.style.overflow = disable ? 'hidden' : '';
}

cartBtn.addEventListener("click", () => {
  cartSidebar.classList.remove("hidden");
  toggleBodyScroll(true);
});

closeCartBtn.addEventListener("click", () => {
  cartSidebar.classList.add("hidden");
  toggleBodyScroll(false);
});


// Add to cart
document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", (e) => {
    const card = e.target.closest("[data-name]");
    const name = card.dataset.name;
    const price = Number(card.dataset.price);

    const existing = cart.find(item => item.name === name);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ name, price, quantity: 1 });
    }

    updateCart();
  });
});

// Update cart view
function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    const div = document.createElement("div");
    div.className = "flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-2 rounded";
    div.innerHTML = `
      <div>
        <p><strong>${item.name}</strong></p>
        <p>₹${item.price} x ${item.quantity}</p>
      </div>
      <div class="flex items-center gap-2">
        <button onclick="decreaseQty(${index})" class="bg-gray-300 px-2 rounded">-</button>
        <span>${item.quantity}</span>
        <button onclick="increaseQty(${index})" class="bg-gray-300 px-2 rounded">+</button>
        <button onclick="removeItem(${index})" class="text-red-600 ml-2">✕</button>
      </div>
    `;
    cartItems.appendChild(div);
  });
  cartTotal.textContent = `₹${total}`;
}

// Remove item
function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

// Increase quantity
function increaseQty(index) {
  cart[index].quantity += 1;
  updateCart();
}

// Decrease quantity
function decreaseQty(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    cart.splice(index, 1);
  }
  updateCart();
}

// Checkout
checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  alert("✅ Order placed successfully!");
  cart.length = 0;
  updateCart();
  cartSidebar.classList.add("hidden");
});
