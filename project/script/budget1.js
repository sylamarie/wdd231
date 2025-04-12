const menuOpenButton = document.querySelector ("#menu-open-button");
const menuCloseButton = document.querySelector ("#menu-close-button");

menuOpenButton.addEventListener("click", () => {
    // Toggle mobile menu visibility
    document.body.classList.toggle("show-mobile-menu");
});

// Close menu when the close button is clicked
menuCloseButton.addEventListener("click", () => menuOpenButton.click ());

document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll('.nav-link');
    const heroSection = document.querySelector('#hero');
    const plannerSection = document.querySelector('#planner');
    const todoGoalsSection = document.querySelector('#todo-goals'); // 👈 added

    function updateActiveNav() {
        const scrollY = window.scrollY;
        const buffer = 150;

        // Remove all active classes
        navLinks.forEach(link => link.classList.remove('active'));

        const plannerTop = plannerSection.offsetTop;
        const plannerHeight = plannerSection.offsetHeight;

        const todoTop = todoGoalsSection.offsetTop;
        const todoHeight = todoGoalsSection.offsetHeight;

        if (scrollY + buffer >= todoTop && scrollY < todoTop + todoHeight) {
            document.querySelector('.nav-link[href="#todo-goals"]').classList.add('active');
        } else if (scrollY + buffer >= plannerTop && scrollY < plannerTop + plannerHeight) {
            document.querySelector('.nav-link[href="#planner"]').classList.add('active');
        } else {
            document.querySelector('.nav-link[href="#"]').classList.add('active');
        }
    }

    window.addEventListener('scroll', updateActiveNav);
    window.addEventListener('load', updateActiveNav);
});
