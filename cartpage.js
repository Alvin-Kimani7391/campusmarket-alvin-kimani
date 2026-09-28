// cartpage.js
// Cart page: shows what is in the cart, lets you change quantities (validated),
// remove items, and clear everything.

var itemsBox = document.getElementById("cartItems");
var emptyMsg = document.getElementById("emptyMsg");
var summary = document.getElementById("cartSummary");
var totalText = document.getElementById("cartTotal");
var excludedNote = document.getElementById("excludedNote");
var clearBtn = document.getElementById("clearBtn");

var invalidIds = {};   // ids whose quantity box currently fails validation

function makeEl(tag, className, text) {
  var e = document.createElement(tag);
  if (className) { e.className = className; }
  if (text) { e.textContent = text; }
  return e;
}

function updateTotal() {
  var cart = getCart();
  var total = 0;
  var skipped = 0;
  for (var i = 0; i < cart.length; i++) {
    if (invalidIds[cart[i].id]) {
      skipped = skipped + 1;   // left out until the quantity is fixed
    } else {
      total = total + findProduct(cart[i].id).price * cart[i].qty;
    }
  }
  totalText.textContent = "Total: KSh " + total.toLocaleString();
  if (skipped > 0) {
    showMsg(excludedNote, skipped + " item(s) left out of the total until the quantity is fixed.");
  } else {
    hideMsg(excludedNote);
  }
}

function buildRow(item) {
  var p = findProduct(item.id);
  var row = makeEl("article", "cart-row");

  var img = document.createElement("img");
  img.src = p.image;
  img.alt = p.alt;
  row.appendChild(img);

  var info = makeEl("div", "cart-info");
  info.appendChild(makeEl("h3", "", p.name));
  info.appendChild(makeEl("p", "category", "KSh " + p.price.toLocaleString() + " each, " + p.stock + " available"));
  var msg = makeEl("p", "error-message");
  msg.setAttribute("aria-live", "polite");
  info.appendChild(msg);
  row.appendChild(info);

  var input = document.createElement("input");
  input.type = "number";
  input.className = "qty";
  input.value = item.qty;
  input.setAttribute("aria-label", "Quantity of " + p.name);
  var stepper = makeEl("div", "stepper");
  var minus = makeEl("button", "", "\u2212");
  var plus = makeEl("button", "", "+");
  minus.type = "button";
  plus.type = "button";
  minus.setAttribute("aria-label", "Decrease quantity of " + p.name);
  plus.setAttribute("aria-label", "Increase quantity of " + p.name);
  stepper.appendChild(minus);
  stepper.appendChild(input);
  stepper.appendChild(plus);
  row.appendChild(stepper);

  var lineTotal = makeEl("p", "subtotal", "KSh " + (p.price * item.qty).toLocaleString());
  row.appendChild(lineTotal);

  var removeBtn = makeEl("button", "clear-btn", "Remove");
  removeBtn.type = "button";
  row.appendChild(removeBtn);

  var current = item.qty;   // last quantity that passed validation

  function applyQty() {
    var problem = validateQuantity(input, p.stock);
    if (problem !== "") {
      showMsg(msg, problem);
      invalidIds[p.id] = true;
      row.classList.add("excluded");
      lineTotal.textContent = "Not counted";
    } else {
      hideMsg(msg);
      delete invalidIds[p.id];
      row.classList.remove("excluded");
      current = Number(input.value);
      var cart = getCart();
      for (var i = 0; i < cart.length; i++) {
        if (cart[i].id === p.id) {
          cart[i].qty = current;
        }
      }
      saveCart(cart);
      lineTotal.textContent = "KSh " + (p.price * current).toLocaleString();
    }
    updateTotal();
  }

  // the + and - buttons stay inside 1 and the stock, and say why when they stop
  function nudge(change) {
    var target = current + change;
    if (target < 1) {
      showMsg(msg, "Minimum is 1 - use Remove to take it out.");
      return;
    }
    if (target > p.stock) {
      showMsg(msg, "Only " + p.stock + " available.");
      return;
    }
    input.value = target;
    applyQty();
  }

  input.addEventListener("input", applyQty);
  minus.addEventListener("click", function () { nudge(-1); });
  plus.addEventListener("click", function () { nudge(1); });

  removeBtn.addEventListener("click", function () {
    var cart = getCart();
    var kept = [];
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].id !== p.id) {
        kept.push(cart[i]);
      }
    }
    delete invalidIds[p.id];
    saveCart(kept);
    renderCart();
  });

  return row;
}

function renderCart() {
  var cart = getCart();
  while (itemsBox.firstChild) {
    itemsBox.removeChild(itemsBox.firstChild);
  }
  for (var i = 0; i < cart.length; i++) {
    itemsBox.appendChild(buildRow(cart[i]));
  }
  if (cart.length === 0) {
    emptyMsg.classList.add("show");
    summary.hidden = true;
  } else {
    emptyMsg.classList.remove("show");
    summary.hidden = false;
  }
  updateTotal();
}

// first click asks, second click within 3 seconds clears
var clearArmed = false;
clearBtn.addEventListener("click", function () {
  if (!clearArmed) {
    clearArmed = true;
    clearBtn.textContent = "Click again to clear";
    setTimeout(function () {
      clearArmed = false;
      clearBtn.textContent = "Clear cart";
    }, 3000);
  } else {
    clearArmed = false;
    clearBtn.textContent = "Clear cart";
    invalidIds = {};
    saveCart([]);
    renderCart();
  }
});

renderCart();