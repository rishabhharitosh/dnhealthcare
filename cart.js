
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

// Builds cart rows using safe DOM APIs (textContent) instead of innerHTML
// string-concatenation, so product data can never be interpreted as HTML/JS.
function updateCartDisplay() {
  const cartList = document.getElementById("cart-items");
  if (!cartList) return;
  cartList.innerHTML = "";

  if (cart.length === 0) {
    const empty = document.createElement("div");
    empty.className = "text-muted small py-2";
    empty.textContent = "Your cart is empty.";
    cartList.appendChild(empty);
    return;
  }

  cart.forEach(item => {
    const row = document.createElement("div");
    row.className = "d-flex align-items-center justify-content-between border-bottom py-2";

    const label = document.createElement("span");
    label.textContent = `${item.name} (x${item.quantity})`;
    row.appendChild(label);

    const btnGroup = document.createElement("span");

    const plusBtn = document.createElement("button");
    plusBtn.type = "button";
    plusBtn.className = "btn btn-sm btn-outline-secondary mx-1";
    plusBtn.textContent = "+";
    plusBtn.addEventListener("click", () => updateQuantity(item.name, 1));

    const minusBtn = document.createElement("button");
    minusBtn.type = "button";
    minusBtn.className = "btn btn-sm btn-outline-secondary mx-1";
    minusBtn.textContent = "-";
    minusBtn.addEventListener("click", () => updateQuantity(item.name, -1));

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "btn btn-sm btn-outline-danger mx-1";
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => removeFromCart(item.name));

    btnGroup.appendChild(plusBtn);
    btnGroup.appendChild(minusBtn);
    btnGroup.appendChild(removeBtn);
    row.appendChild(btnGroup);

    cartList.appendChild(row);
  });
}

function proceedToWhatsApp() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  let message = "Hello! I'm interested in the following products:\n\n";
  cart.forEach(item => {
    message += `• ${item.name} (x${item.quantity})\n`;
  });

  // Official DN Healthcare contact number (kept in sync with the footer).
  const phoneNumber = "918810688741";
  // encodeURIComponent safely escapes the whole message (including
  // characters like & # + which would otherwise corrupt the URL).
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  // noopener prevents the newly opened tab from getting a handle back to
  // this page via window.opener.
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
}
