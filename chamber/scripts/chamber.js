document.addEventListener("DOMContentLoaded", () => {
    const membersContainer = document.getElementById("members-container");
    const gridViewBtn = document.getElementById("gridView");
    const listViewBtn = document.getElementById("listView");
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    async function fetchMembers() {
        try {
            const response = await fetch("data/members.json");
            if (!response.ok) throw new Error("Failed to fetch data.");
            const members = await response.json();
            displayGridView(members); // Default to Grid View

            // Event listeners for switching views
            gridViewBtn.addEventListener("click", () => displayGridView(members));
            listViewBtn.addEventListener("click", () => displayListView(members));
        } catch (error) {
            console.error("Error fetching members:", error);
        }
    }

    function displayGridView(members) {
        membersContainer.className = "grid";
        membersContainer.innerHTML = members.map(member => `
            <div class="member-card">
                <img src="${member.image}" alt="${member.name}">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
            </div>
        `).join("");
    }

    function displayListView(members) {
        membersContainer.className = "list";

        // Create table format for list view
        membersContainer.innerHTML = `
            <table class="member-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>ID</th>
                        <th>Website</th>
                    </tr>
                </thead>
                <tbody>
                    ${members.map(member => `
                        <tr>
                            <td>${member.name}</td>
                            <td>${member.address}</td>
                            <td>${member.phone}</td>
                            <td><a href="${member.website}" target="_blank">Visit Website</a></td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        `;
    }

    // Toggle mobile menu
    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("active");
        const isExpanded = navLinks.classList.contains("active");
        menuToggle.setAttribute("aria-expanded", isExpanded);
    });

    // Update footer with the current year and last modified date
    document.getElementById("year").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = document.lastModified;

    // Fetch and display members
    fetchMembers();
    
    // Fetch and display the spotlight members if the spotlight-container exists
    const spotlightContainer = document.getElementById("spotlight-container");
    if (spotlightContainer) {
        fetch("data/members.json")
            .then(response => response.json())
            .then(data => {
                displaySpotlightMembers(data.members);
            })
            .catch(error => {
                console.error("Error loading members for spotlight:", error);
                spotlightContainer.innerHTML = "<p>Spotlight data unavailable.</p>";
            });
    }
});

function displaySpotlightMembers(members) {
    const goldSilverMembers = members.filter(member => member.membership === 2 || member.membership === 3);

    if (goldSilverMembers.length === 0) return;

    const numMembersToSelect = 3; // Ensure exactly 3 spotlight members
    const selectedMembers = [];

    while (selectedMembers.length < numMembersToSelect && goldSilverMembers.length > 0) {
        const randomIndex = Math.floor(Math.random() * goldSilverMembers.length);
        selectedMembers.push(goldSilverMembers.splice(randomIndex, 1)[0]);
    }

    const spotlightContainer = document.getElementById('spotlights');
    spotlightContainer.classList.add("spotlight-container"); // Ensure the correct class is applied
    spotlightContainer.innerHTML = "";

    selectedMembers.forEach(member => {
        const memberDiv = document.createElement('div');
        memberDiv.classList.add('business-card');
        memberDiv.innerHTML = `
            <img src="${member.image}" alt="${member.name}" class="business-logo">
            <h3>${member.name}</h3>
            <p><strong>Address:</strong> ${member.address}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
        `;
        spotlightContainer.appendChild(memberDiv);
    });
}



// Fetch and display the spotlight members if the spotlight container exists
const spotlightContainer = document.getElementById("spotlights");
if (spotlightContainer) {
    fetch("data/members.json")
        .then(response => response.json())
        .then(data => {
            displaySpotlightMembers(data);
        })
        .catch(error => {
            console.error("Error loading members for spotlight:", error);
            spotlightContainer.innerHTML = "<p>Spotlight data unavailable.</p>";
        });
}