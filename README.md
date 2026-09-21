Name: Lempukoti Alvin Kimani
Reg No: CIT-223-072/2024



# CampusMarket

CampusMarket is a small online marketplace built for students in our university. The idea is that instead of posting items for sale in random WhatsApp groups, students can list what they're selling in one place and other students can browse, search, and (eventually) buy.

This is my semester project for **CCS 2314: Web Based Programming II**. It's being built up week by week, starting with plain HTML/CSS and eventually growing into a full PHP + MySQL application with accounts, a cart, and checkout.

## Course
CCS 2314 - Web Based Programming II

## Tech used so far
- HTML5
- CSS3
- JavaScript

More will be added as the semester goes on (PHP, MySQL, sessions, etc).

## Project structure
```
campusmarket/
  index.html      - home page
  catalog.html    - product listing page
  styles.css      - shared styling for all pages
  app.js          - filtering and calculation logic
  images/         - product images used on the catalog page
```

## How to run it
No server needed yet, it's all static so far.
1. Clone the repo
2. Open `index.html` in a browser

## Progress

**Week 1 - Static catalog pages**
- Built `index.html` and `catalog.html`
- Styled both pages with `styles.css`
- Catalog shows 6 products with name, category, description and price

**Week 2 - JavaScript filtering and calculations**
- Added `app.js`
- Search box and category dropdown filter the catalog live
- Each product has a quantity input that calculates a running subtotal, plus an overall cart total at the bottom of the page

**Week 3 - coming next**
- Registration form with validation
- Interactive UI element

## Notes
Built one part at a time, committing after each part so the commit history actually reflects how it was built.