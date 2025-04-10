document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("places-container");
    const modal = document.getElementById("infoModal");
    const modalTitle = document.getElementById("modal-title");
    const modalAddress = document.getElementById("modal-address");
    const modalDescription = document.getElementById("modal-description");
    const closeModal = document.querySelector(".close");

    // Show custom visit message
    showVisitMessage();

    // Fetch data from JSON and display cards
    fetch("data/discover.json")
        .then(response => response.json())
        .then(places => {
            places.forEach(place => {
                // Create card
                const card = document.createElement("div");
                card.classList.add("card", "discover-card");

                // Add content with lazy loading
                card.innerHTML = `
                    <h3>${place.name}</h3>
                    <img loading="lazy" src="${place.image}" alt="${place.name}">
                    <p>${place.address}</p>
                    <button class="learn-more" data-name="${place.name}" data-address="${place.address}" data-description="${place.description}">
                        Learn More
                    </button>
                `;

                // Append card to container
                container.appendChild(card);
            });

            // Add event listener to buttons
            document.querySelectorAll(".learn-more").forEach(button => {
                button.addEventListener("click", (event) => {
                    modalTitle.textContent = event.target.dataset.name;
                    modalAddress.textContent = event.target.dataset.address;
                    modalDescription.textContent = event.target.dataset.description;
                    modal.style.display = "flex";
                });
            });

            // Close modal
            closeModal.addEventListener("click", () => {
                modal.style.display = "none";
            });

            // Close modal when clicking outside
            window.addEventListener("click", (event) => {
                if (event.target === modal) {
                    modal.style.display = "none";
                }
            });
        })
        .catch(error => console.error("Error fetching data:", error));
});

// Custom Visit Message Function
function showVisitMessage() {
    const now = new Date();
    const lastVisit = localStorage.getItem("lastVisit");
    const messageContainer = document.createElement("div");
    messageContainer.classList.add("visit-message");

    if (lastVisit) {
        const lastVisitDate = new Date(lastVisit);
        const daysSinceLast = Math.floor((now - lastVisitDate) / (1000 * 60 * 60 * 24));
        messageContainer.textContent = `Welcome back! It's been ${daysSinceLast} day(s) since your last visit.`;
    } else {
        messageContainer.textContent = "Welcome! This is your first time visiting this page.";
    }

    document.body.prepend(messageContainer);
    localStorage.setItem("lastVisit", now);
}
