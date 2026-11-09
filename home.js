// home.js
// Home page: builds the featured product cards from the fetched product list.
// If the fetch fails only the featured box shows a message, the rest of the page is untouched.

var featuredGrid = document.getElementById("featuredGrid");
var homeStatus = document.getElementById("homeStatus");

function el(tag, className, text) {
  var e = document.createElement(tag);
  if (className) { e.className = className; }
  if (text) { e.textContent = text; }
  return e;
}

function featuredCard(p) {
  var card = el("article", "product");
  card.appendChild(el("span", "discount", p.discount));

  var link = document.createElement("a");
  link.href = "catalog.html?q=" + encodeURIComponent(p.name);
  var img = document.createElement("img");
  img.src = p.image;
  img.alt = p.alt;
  link.appendChild(img);
  card.appendChild(link);

  card.appendChild(el("h3", "", p.name));
  card.appendChild(el("p", "category", p.category));
  var prices = el("p", "prices");
  prices.appendChild(el("span", "old-price", "KSh " + p.oldPrice.toLocaleString()));
  prices.appendChild(el("span", "price", "KSh " + p.price.toLocaleString()));
  card.appendChild(prices);
  card.appendChild(el("p", "stock", p.stock + " left"));

  var msg = el("p", "error-message");
  msg.setAttribute("aria-live", "polite");
  card.appendChild(msg);

  var btn = el("button", "add-btn", "Add to cart");
  btn.type = "button";
  var timer = null;
  btn.addEventListener("click", function () {
    var problem = addToCart(p.id, 1);   // same stock rule as the catalog
    if (problem !== "") {
      showMsg(msg, problem);
      return;
    }
    hideMsg(msg);
    clearTimeout(timer);
    btn.textContent = "\u2713 Added to cart";
    btn.classList.remove("done");
    void btn.offsetWidth;
    btn.classList.add("done");
    timer = setTimeout(function () {
      btn.textContent = "Add to cart";
      btn.classList.remove("done");
    }, 1600);
  });
  card.appendChild(btn);
  return card;
}

async function showFeatured() {
  homeStatus.textContent = "Loading featured products...";
  homeStatus.classList.remove("error");
  homeStatus.hidden = false;

  var loaded = await loadProducts();
  if (!loaded) {
    homeStatus.textContent = "Featured products could not be loaded right now. ";
    homeStatus.classList.add("error");
    var retry = el("button", "retry-btn", "Try again");
    retry.type = "button";
    retry.addEventListener("click", showFeatured);
    homeStatus.appendChild(retry);
    featuredGrid.setAttribute("aria-busy", "false");
    return;
  }

  homeStatus.hidden = true;
  while (featuredGrid.firstChild) {
    featuredGrid.removeChild(featuredGrid.firstChild);
  }
  for (var i = 0; i < PRODUCTS.length; i++) {
    featuredGrid.appendChild(featuredCard(PRODUCTS[i]));
  }
  featuredGrid.setAttribute("aria-busy", "false");
}

showFeatured();
