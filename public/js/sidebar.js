// main.js

// Function for toggling the sidebar
function toggleMenu() {
  let body = document.body;
  let navigation = document.querySelector(".navigation");
  let toggle = document.querySelector(".toggle");

  body.classList.toggle("sidebar-open");
  navigation.classList.toggle("active");
  toggle.classList.toggle("active");
}

// Function for toggling the theme of the main content area
function togglePageTheme() {
  let darkModeToggle = document.getElementById("darkModeToggle");
  let mainContent = document.querySelector(".main");

  darkModeToggle.addEventListener("change", function () {
      mainContent.classList.toggle("dark-mode", darkModeToggle.checked);
  });
}

// Attach the theme toggle function when the DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  togglePageTheme();
});

// Add additional functionality or event listeners as needed
