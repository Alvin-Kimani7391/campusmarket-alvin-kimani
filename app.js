// app.js
// CampusMarket - Week 2
// Handles the search/category filter and the quantity x price calculation
// on the catalog page.

// runs every time the search box or the category dropdown changes
function filterProducts() {
  var searchBox = document.getElementById("search");
  var categoryBox = document.getElementById("categoryFilter");

  var searchTerm = searchBox.value.toLowerCase();
  var chosenCategory = categoryBox.value;

  var allProducts = document.getElementsByClassName("product");
  var visibleCount = 0;

  // loop through every product card and decide if it should be shown
  for (var i = 0; i < allProducts.length; i++) {
    var product = allProducts[i];
    var productName = product.getAttribute("data-name").toLowerCase();
    var productCategory = product.getAttribute("data-category");

    var matchesName = productName.indexOf(searchTerm) !== -1;
    var matchesCategory = (chosenCategory === "all" || productCategory === chosenCategory);

    if (matchesName && matchesCategory) {
      product.style.display = "block";
      visibleCount = visibleCount + 1;
    } else {
      product.style.display = "none";
    }
  }

  // let the user know when nothing matched instead of just an empty page
  var noResultsMsg = document.getElementById("noResults");
  if (visibleCount === 0) {
    noResultsMsg.style.display = "block";
  } else {
    noResultsMsg.style.display = "none";
  }
}

// runs when a quantity input changes, updates that product's own subtotal
function updateSubtotal(qtyInput) {
  var product = qtyInput.closest(".product");
  var price = parseFloat(product.getAttribute("data-price"));
  var quantity = parseInt(qtyInput.value);

  // guard against empty input, letters, or a negative number
  if (isNaN(quantity) || quantity < 0) {
    quantity = 0;
    qtyInput.value = 0;
  }

  var subtotal = price * quantity;
  var subtotalText = product.querySelector(".subtotal");
  subtotalText.textContent = "Subtotal: KSh " + subtotal;

  // whenever one item changes, the overall cart total has to change too
  updateCartTotal();
}

// adds up the subtotal of every product currently on the page
function updateCartTotal() {
  var allProducts = document.getElementsByClassName("product");
  var cartTotal = 0;

  for (var i = 0; i < allProducts.length; i++) {
    var price = parseFloat(allProducts[i].getAttribute("data-price"));
    var qtyInput = allProducts[i].querySelector(".qty");
    var quantity = parseInt(qtyInput.value);

    if (isNaN(quantity)) {
      // skip it, treat a blank box as 0 items
    } else {
      cartTotal = cartTotal + (price * quantity);
    }
  }

  document.getElementById("cartTotal").textContent = "Cart total: KSh " + cartTotal;
}