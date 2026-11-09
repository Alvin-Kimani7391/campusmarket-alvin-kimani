// home.js
// Home page: fills the three featured items from the fetched product list.
// If the fetch fails only this small box shows a message, the rest of the page is untouched.

var FEATURED_IDS = [1, 2, 6];

async function showFeatured() {
  var box = document.getElementById("heroShots");
  var loaded = await loadProducts();

  while (box.firstChild) {
    box.removeChild(box.firstChild);
  }
  if (!loaded) {
    var note = document.createElement("p");
    note.className = "shots-note";
    note.textContent = "Featured items could not be loaded right now.";
    box.appendChild(note);
    return;
  }

  for (var i = 0; i < FEATURED_IDS.length; i++) {
    var p = findProduct(FEATURED_IDS[i]);
    if (!p) { continue; }
    var fig = document.createElement("figure");
    var img = document.createElement("img");
    img.src = p.image;
    img.alt = p.alt;
    var cap = document.createElement("figcaption");
    cap.textContent = p.name;
    var price = document.createElement("strong");
    price.textContent = "KSh " + p.price.toLocaleString();
    cap.appendChild(price);
    fig.appendChild(img);
    fig.appendChild(cap);
    box.appendChild(fig);
  }
}

showFeatured();
