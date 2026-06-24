document.addEventListener("DOMContentLoaded", () => {
  const toggleSwitch = document.querySelector("#checkbox");
  toggleSwitch.addEventListener("change", (event) => {
    if (event.target.checked) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  });
  const hamburger = document.querySelector(".hamburger");
  const menuItems = document.querySelector(".menu-items");
  hamburger.addEventListener("click", () => {
    menuItems.classList.toggle("active");
  });
});