// shared.js
// Things every page needs: the cart (saved in localStorage), the quantity
// validation rule, the error message show/hide, and the cart badge in the nav.

var CART_KEY = "campusmarket-cart";

function getCart() {
  try {
    var saved = localStorage.getItem(CART_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateBadge();
}

function cartCount() {
  var cart = getCart();
  var count = 0;
  for (var i = 0; i < cart.length; i++) {
    count = count + cart[i].qty;
  }
  return count;
}

function updateBadge() {
  var badge = document.getElementById("cartCount");
  if (badge) {
    badge.textContent = cartCount();
  }
}

// returns "" if the quantity is fine, otherwise the reason it is not
function validateQuantity(input, max) {
  var raw = input.value.trim();
  if (raw === "") {
    if (input.validity.badInput) {
      return "That is not a number.";
    }
    return "Enter a quantity.";
  }
  var n = Number(raw);
  if (isNaN(n)) {
    return "That is not a number.";
  } else if (n % 1 !== 0) {
    return "Quantity must be a whole number.";
  } else if (n < 0) {
    return "Quantity cannot be negative.";
  } else if (n === 0) {
    return "Quantity must be at least 1.";
  } else if (n > max) {
    return "Only " + max + " available.";
  }
  return "";
}

// returns "" on success, or a message if it could not be added
function addToCart(id, qty) {
  var product = findProduct(id);
  var cart = getCart();
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].id === id) {
      if (cart[i].qty + qty > product.stock) {
        return "You already have " + cart[i].qty + " in your cart. Only " + product.stock + " available.";
      }
      cart[i].qty = cart[i].qty + qty;
      saveCart(cart);
      return "";
    }
  }
  cart.push({ id: id, qty: qty });
  saveCart(cart);
  return "";
}

function showMsg(box, text) {
  box.textContent = text;
  box.classList.add("show");
}

// only the class is removed so the text can fade out with the transition
function hideMsg(box) {
  box.classList.remove("show");
}

updateBadge();

// header search box: on the catalog it filters live (app.js), elsewhere it jumps to the catalog
var siteForm = document.getElementById("siteSearch");
siteForm.addEventListener("submit", function (event) {
  event.preventDefault();
  if (!document.getElementById("productGrid")) {
    window.location.href = "catalog.html?q=" + encodeURIComponent(document.getElementById("search").value.trim());
  }
});