document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("places-container");
    const modal = document.getElementById("infoModal");
    const modalTitle = document.getElementById("modal-title");
    const modalAddress = document.getElementById("modal-address");
    const modalDescription = document.getElementById("modal-description");
    const closeModal = document.querySelector(".close");

    // Fetch data from JSON
    fetch("data/discover.json")
        .then(response => response.json())
        .then(places => {
            places.forEach(place => {
                // Create card
                const card = document.createElement("div");
                card.classList.add("card");

                // Add content
                card.innerHTML = `
                    <h3>${place.name}</h3>
                    <img src="${place.image}" alt="${place.name}">
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
