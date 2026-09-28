// products.js
// The one list of products for the whole site. The catalog cards, the filter,
// the gallery and the cart all read from this same array.

var PRODUCTS = [
  { id: 1, name: "Scientific Calculator", category: "Electronics", price: 1140, oldPrice: 1200, discount: "-5%", stock: 3,
    image: "images/calculator.jpeg", alt: "Black Casio fx-991 scientific calculator with its slide-on cover",
    desc: "Casio fx-991, used two semesters, cover still on." },
  { id: 2, name: "Discrete Mathematics Textbook", category: "Books", price: 700, oldPrice: 800, discount: "-12%", stock: 2,
    image: "images/textbook.jpg", alt: "Discrete Mathematics textbook by Rosen, 7th edition, lying flat",
    desc: "Rosen 7th edition, only chapter one highlighted." },
  { id: 3, name: "Electric Kettle", category: "Hostel", price: 1400, oldPrice: 1500, discount: "-7%", stock: 1,
    image: "images/kettle.webp", alt: "1.7 litre electric kettle with a black handle",
    desc: "1.7 litres, boils fast, moving out of hostel." },
  { id: 4, name: "White Lab Coat", category: "Clothing", price: 600, oldPrice: 650, discount: "-8%", stock: 4,
    image: "images/labcoat.jpg", alt: "Folded white lab coat, size medium",
    desc: "Size M, washed and ironed, fits chem and bio labs." },
  { id: 5, name: "USB Flash Drive 64GB", category: "Electronics", price: 630, oldPrice: 700, discount: "-10%", stock: 5,
    image: "images/flash.jpg", alt: "Sealed Sandisk 64GB USB flash drive in its packaging",
    desc: "Sandisk, brand new and still sealed in the pack." },
  { id: 6, name: "Study Desk Lamp", category: "Hostel", price: 900, oldPrice: 950, discount: "-5%", stock: 2,
    image: "images/lamp.jpg", alt: "Small LED study desk lamp with a bendable neck",
    desc: "LED lamp, three brightness levels, good for late nights." }
];

function findProduct(id) {
  for (var i = 0; i < PRODUCTS.length; i++) {
    if (PRODUCTS[i].id === id) {
      return PRODUCTS[i];
    }
  }
  return null;
}