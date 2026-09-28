// gallery.js
// Slideshow. It does not own any product data, app.js hands it whatever
// products are left after filtering and it shows only those.

var Gallery = {
  items: [],
  index: 0,
  img: document.getElementById("galleryImg"),
  caption: document.getElementById("galleryCaption"),
  count: document.getElementById("galleryCount"),
  prev: document.getElementById("galleryPrev"),
  next: document.getElementById("galleryNext"),
  box: document.getElementById("gallery"),

  update: function (list) {
    this.items = list;
    this.index = 0;
    this.show();
  },

  show: function () {
    var n = this.items.length;
    if (n === 0) {
      this.img.hidden = true;
      this.caption.textContent = "No images for this search.";
      this.count.textContent = "";
    } else {
      var p = this.items[this.index];
      this.img.hidden = false;
      this.img.src = p.image;
      this.img.alt = p.alt;
      this.caption.textContent = p.name + " - KSh " + p.price.toLocaleString();
      this.count.textContent = (this.index + 1) + " / " + n;
      // restart the fade animation every time the picture changes
      this.img.classList.remove("swap");
      void this.img.offsetWidth;
      this.img.classList.add("swap");
    }
    this.prev.disabled = n < 2;
    this.next.disabled = n < 2;
  },

  go: function (step) {
    var n = this.items.length;
    if (n < 2) {
      return;
    }
    // the + n keeps it positive so going back from the first one wraps to the last
    this.index = (this.index + step + n) % n;
    this.show();
  }
};

Gallery.prev.addEventListener("click", function () { Gallery.go(-1); });
Gallery.next.addEventListener("click", function () { Gallery.go(1); });
Gallery.box.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft") {
    Gallery.go(-1);
  } else if (event.key === "ArrowRight") {
    Gallery.go(1);
  }
});