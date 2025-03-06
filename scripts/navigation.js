document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.getElementById("menu-button");
    const navMenu = document.getElementById("nav-menu");

    menuButton.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });

    // Close menu when clicking outside
    document.addEventListener("click", (event) => {
        if (!menuButton.contains(event.target) && !navMenu.contains(event.target)) {
            navMenu.classList.remove("active");
        }
    });
});
