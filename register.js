// register.js
// Registration form. Every message says exactly what is wrong, errors fade in
// with a CSS transition, and a successful submit plays a keyframe animation.

var form = document.getElementById("registerForm");
var successBox = document.getElementById("successMessage");

function nameProblem(v) {
  if (v === "") { return "Full name is required."; }
  if (v.indexOf(" ") === -1) { return "Please enter your first and last name."; }
  return "";
}

function emailProblem(v) {
  if (v === "") { return "Email is required - type your student email."; }
  var at = v.indexOf("@");
  if (at === -1) { return "Email must contain an @ symbol."; }
  if (at !== v.lastIndexOf("@")) { return "Email can only contain one @ symbol."; }
  if (v.indexOf(" ") !== -1) { return "Email cannot contain spaces."; }
  if (at === 0) { return "Add your username before the @."; }
  var domain = v.slice(at + 1);
  if (domain.indexOf(".") === -1) { return "Email needs a domain after the @, like name@university.ac.ke."; }
  if (domain.charAt(0) === "." || domain.charAt(domain.length - 1) === ".") { return "The part after the @ looks incomplete."; }
  return "";
}

function passwordProblem(v) {
  if (v === "") { return "Password is required."; }
  if (v.length < 8) { return "Password must be at least 8 characters - yours has " + v.length + "."; }
  if (!/[0-9]/.test(v)) { return "Password must include at least one number."; }
  return "";
}

function confirmProblem(v) {
  if (v === "") { return "Please confirm your password."; }
  if (v !== document.getElementById("password").value) { return "Passwords do not match - retype the same password."; }
  return "";
}

var fields = [
  { id: "fullName", errorId: "nameError", check: nameProblem },
  { id: "email", errorId: "emailError", check: emailProblem },
  { id: "password", errorId: "passwordError", check: passwordProblem },
  { id: "confirmPassword", errorId: "confirmError", check: confirmProblem }
];

function checkField(f) {
  var input = document.getElementById(f.id);
  var box = document.getElementById(f.errorId);
  var value = (f.id === "password" || f.id === "confirmPassword") ? input.value : input.value.trim();
  var problem = f.check(value);
  if (problem !== "") {
    showMsg(box, problem);
    input.classList.add("invalid");
    return false;
  }
  hideMsg(box);
  input.classList.remove("invalid");
  return true;
}

form.addEventListener("submit", function (event) {
  event.preventDefault();   // stop the reload so we can validate first
  successBox.classList.remove("celebrate");

  var allGood = true;
  for (var i = 0; i < fields.length; i++) {
    if (!checkField(fields[i])) {
      allGood = false;
    }
  }

  if (allGood) {
    form.reset();
    void successBox.offsetWidth;
    successBox.classList.add("celebrate");   // animation only runs after a valid submit
  }
});

// once a field is showing an error, re-check it as the user fixes it
for (var i = 0; i < fields.length; i++) {
  (function (f) {
    document.getElementById(f.id).addEventListener("input", function () {
      if (document.getElementById(f.errorId).classList.contains("show")) {
        checkField(f);
      }
    });
  })(fields[i]);
}

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