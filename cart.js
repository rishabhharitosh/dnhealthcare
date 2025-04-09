
let cart = [];

function addToCart(productName) {
  const existing = cart.find(p => p.name === productName);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name: productName, quantity: 1 });
  }
  updateCartDisplay();
}

function removeFromCart(productName) {
  cart = cart.filter(p => p.name !== productName);
  updateCartDisplay();
}

function updateQuantity(productName, delta) {
  const item = cart.find(p => p.name === productName);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      removeFromCart(productName);
    } else {
      updateCartDisplay();
    }
  }
}

function updateCartDisplay() {
  const cartList = document.getElementById("cart-items");
  cartList.innerHTML = "";
  cart.forEach(item => {
    const div = document.createElement("div");
    div.innerHTML = `
      ${item.name} (x${item.quantity})
      <button onclick="updateQuantity('${item.name}', 1)">+</button>
      <button onclick="updateQuantity('${item.name}', -1)">-</button>
      <button onclick="removeFromCart('${item.name}')">Remove</button>
    `;
    cartList.appendChild(div);
  });
}

function proceedToWhatsApp() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  let message = "Hello! I'm interested in the following products:%0A%0A";
  cart.forEach(item => {
    message += `• ${item.name} (x${item.quantity})%0A`;
  });

  const phoneNumber = "919876543210"; // Replace with your WhatsApp number
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
  window.open(whatsappUrl, '_blank');
}
