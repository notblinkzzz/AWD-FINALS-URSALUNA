document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("signup") === "success") {
    alert("Sign up successful! Please login with your credentials.");
  }

  const languageButtons = document.querySelectorAll(".language-toggle");

  languageButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const dropdownMenu = this.nextElementSibling;
      if (dropdownMenu) {
        dropdownMenu.classList.toggle("hidden");
      }
    });
  });

  document.addEventListener("click", function (event) {
    languageButtons.forEach((button) => {
      const dropdownMenu = button.nextElementSibling;
      if (
        dropdownMenu &&
        !button.contains(event.target) &&
        !dropdownMenu.contains(event.target)
      ) {
        dropdownMenu.classList.add("hidden");
      }
    });
  });
});

function togglePassword() {
  var passwordField = document.getElementById("password");
  passwordField.type = passwordField.type === "password" ? "text" : "password";
}

function validateForm(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (password.length < 6) {
    alert("Password must be at least 6 characters long");
    return false;
  }

  if (email !== "admin" || password !== "admin123") {
    alert("Invalid username or password. You are not an admin.");
    return false;
  }

  window.location.href = "../user-list/index.html";
  return false;
}
