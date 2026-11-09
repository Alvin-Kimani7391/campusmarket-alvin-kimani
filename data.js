// data.js
// Loads the product list from products.json with fetch. Every page that needs
// products (catalog, cart, home) calls loadProducts() and waits for it.

var PRODUCTS = [];   // filled by loadProducts() once the fetch succeeds

// Returns true if the products loaded, false if anything went wrong.
async function loadProducts() {
  try {
    var response = await fetch("products.json");          // 1. ask the server for the file
    if (!response.ok) {                                     // 2. 404, 500 etc. do not throw by themselves
      throw new Error("Server answered " + response.status);
    }
    var data = await response.json();                       // 3. read the body and parse the JSON
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("products.json is empty or in the wrong format");
    }
    PRODUCTS = data;                                        // 4. keep it for the filter, gallery and cart
    return true;
  } catch (error) {
    console.error("Could not load products:", error);      // network down, bad JSON, or the checks above
    PRODUCTS = [];
    return false;
  }
}

function findProduct(id) {
  for (var i = 0; i < PRODUCTS.length; i++) {
    if (PRODUCTS[i].id === id) {
      return PRODUCTS[i];
    }
  }
  return null;
}
