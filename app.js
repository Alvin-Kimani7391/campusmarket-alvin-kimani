// app.js
// Catalog page: builds the product cards from PRODUCTS, runs the search and
// category filter, validates quantities, keeps the running total, and adds to cart.

var grid = document.getElementById("productGrid");
var searchBox = document.getElementById("search");
var categoryBox = document.getElementById("categoryFilter");
var countText = document.getElementById("count");
var noResults = document.getElementById("noResults");
var selectionTotal = document.getElementById("selectionTotal");

var cards = {};      // product id -> its card element
var selected = {};   // product id -> quantity that passed validation

function makeEl(tag, className, text) {
  var e = document.createElement(tag);
  if (className) { e.className = className; }
  if (text) { e.textContent = text; }
  return e;
}

function buildCard(p) {
  var card = makeEl("article", "product");

  card.appendChild(makeEl("span", "discount", p.discount));

  var img = document.createElement("img");
  img.src = p.image;
  img.alt = p.alt;
  card.appendChild(img);

  card.appendChild(makeEl("h3", "", p.name));
  card.appendChild(makeEl("p", "category", p.category));
  card.appendChild(makeEl("p", "description", p.desc));

  var prices = makeEl("p", "prices");
  prices.appendChild(makeEl("span", "old-price", "KSh " + p.oldPrice.toLocaleString()));
  prices.appendChild(makeEl("span", "price", "KSh " + p.price.toLocaleString()));
  card.appendChild(prices);
  card.appendChild(makeEl("p", "stock", p.stock + " left"));

  var row = makeEl("div", "qty-row");
  var label = makeEl("label", "", "Qty");
  var input = document.createElement("input");
  input.type = "number";
  input.className = "qty";
  input.id = "qty-" + p.id;
  input.placeholder = "0";
  label.htmlFor = input.id;
  var sub = makeEl("p", "subtotal", "Subtotal: KSh 0");
  row.appendChild(label);
  row.appendChild(input);
  row.appendChild(sub);
  card.appendChild(row);

  var msg = makeEl("p", "error-message");
  msg.setAttribute("aria-live", "polite");
  card.appendChild(msg);

  var addBtn = makeEl("button", "add-btn", "Add to cart");
  addBtn.type = "button";
  card.appendChild(addBtn);
  var resetTimer = null;

  // typing in the box checks it straight away
  input.addEventListener("input", function () {
    checkQty(p, input, sub, msg, false);
  });

  addBtn.addEventListener("click", function () {
    var qty = checkQty(p, input, sub, msg, true);
    if (qty === 0) {
      return; // failed validation, the message is already showing
    }
    var problem = addToCart(p.id, qty);
    if (problem !== "") {
      showMsg(msg, problem);
      return;
    }
    input.value = "";
    checkQty(p, input, sub, msg, false);
    // the button confirms the add, then goes back to normal after a moment
    clearTimeout(resetTimer);
    addBtn.textContent = "\u2713 Added to cart";
    addBtn.classList.remove("done");
    void addBtn.offsetWidth;
    addBtn.classList.add("done");
    resetTimer = setTimeout(function () {
      addBtn.textContent = "Add to cart";
      addBtn.classList.remove("done");
    }, 1600);
  });

  cards[p.id] = card;
  return card;
}

// returns the valid quantity, or 0 if it is empty/invalid (and says why)
function checkQty(p, input, sub, msg, complainIfEmpty) {
  var untouched = input.value === "" && !input.validity.badInput;
  if (untouched && !complainIfEmpty) {
    hideMsg(msg);
    sub.textContent = "Subtotal: KSh 0";
    selected[p.id] = 0;
    updateSelectionTotal();
    return 0;
  }
  var problem = validateQuantity(input, p.stock);
  if (problem !== "") {
    showMsg(msg, problem);
    sub.textContent = "Not counted";
    selected[p.id] = 0;   // invalid input never reaches the total
    updateSelectionTotal();
    return 0;
  }
  var qty = Number(input.value);
  hideMsg(msg);
  sub.textContent = "Subtotal: KSh " + (p.price * qty).toLocaleString();
  selected[p.id] = qty;
  updateSelectionTotal();
  return qty;
}

function updateSelectionTotal() {
  var total = 0;
  for (var i = 0; i < PRODUCTS.length; i++) {
    var q = selected[PRODUCTS[i].id];
    if (q) {
      total = total + PRODUCTS[i].price * q;
    }
  }
  selectionTotal.textContent = "Selected on this page: KSh " + total.toLocaleString();
}

// the filter builds the list of matches, then gives that SAME list to the gallery
function applyFilter() {
  var term = searchBox.value.trim().toLowerCase();
  var cat = categoryBox.value;
  var results = [];

  for (var i = 0; i < PRODUCTS.length; i++) {
    var p = PRODUCTS[i];
    var nameMatch = p.name.toLowerCase().indexOf(term) !== -1;
    var catMatch = (cat === "all" || p.category === cat);
    if (nameMatch && catMatch) {
      results.push(p);
      cards[p.id].classList.remove("gone");
    } else {
      cards[p.id].classList.add("gone");
    }
  }

  countText.textContent = results.length + " of " + PRODUCTS.length + " items shown";
  if (results.length === 0) {
    noResults.classList.add("show");
  } else {
    noResults.classList.remove("show");
  }
  Gallery.update(results);
}

for (var i = 0; i < PRODUCTS.length; i++) {
  grid.appendChild(buildCard(PRODUCTS[i]));
}
var startQuery = new URLSearchParams(window.location.search).get("q");
if (startQuery) {
  searchBox.value = startQuery;
}
var startCat = new URLSearchParams(window.location.search).get("cat");
if (startCat) {
  categoryBox.value = startCat;
  if (categoryBox.value !== startCat) {
    categoryBox.value = "all";   // ignore a category name that does not exist
  }
}
searchBox.addEventListener("input", applyFilter);
categoryBox.addEventListener("change", applyFilter);
applyFilter();