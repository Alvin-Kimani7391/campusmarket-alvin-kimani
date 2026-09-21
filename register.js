// register.js
// CampusMarket - Week 3
// Validates the registration form and handles the show/hide password toggle.
// Everything here is attached with addEventListener, no onclick in the HTML.

var form = document.getElementById("registerForm");
var successMessage = document.getElementById("successMessage");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // stop the page from reloading before we check anything

  var fullName = document.getElementById("fullName").value.trim();
  var email = document.getElementById("email").value.trim();
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirmPassword").value;

  // clear old messages before checking again
  clearErrors();
  successMessage.style.display = "none";

  var isValid = true;

  // check 1: required field, name cannot be empty
  if (fullName === "") {
    showError("nameError", "Please enter your full name.");
    isValid = false;
  }

  // check 2: format check, needs to look like an email
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === "") {
    showError("emailError", "Please enter your student email.");
    isValid = false;
  } else if (!emailPattern.test(email)) {
    showError("emailError", "That doesn't look like a valid email address.");
    isValid = false;
  }

  // check 3 (required field again, on password): can't be empty either
  if (password === "") {
    showError("passwordError", "Please enter a password.");
    isValid = false;
  } else if (password.length < 6) {
    showError("passwordError", "Password should be at least 6 characters.");
    isValid = false;
  }

  // check 4: custom rule, the two password fields must match
  if (password !== "" && confirmPassword !== password) {
    showError("confirmError", "Passwords do not match.");
    isValid = false;
  }

  if (isValid) {
    successMessage.style.display = "block";
    form.reset();
  }
});

function showError(elementId, message) {
  var errorBox = document.getElementById(elementId);
  errorBox.textContent = message;
  errorBox.style.display = "block";
}

function clearErrors() {
  var errorBoxes = document.getElementsByClassName("error-message");
  for (var i = 0; i < errorBoxes.length; i++) {
    errorBoxes[i].textContent = "";
    errorBoxes[i].style.display = "none";
  }
}

// interactive UI element: toggle the password field between hidden and visible text
var toggleButton = document.getElementById("togglePassword");
var passwordField = document.getElementById("password");

toggleButton.addEventListener("click", function () {
  if (passwordField.type === "password") {
    passwordField.type = "text";
    toggleButton.textContent = "Hide";
  } else {
    passwordField.type = "password";
    toggleButton.textContent = "Show";
  }
});