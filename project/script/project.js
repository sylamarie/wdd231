document.addEventListener("DOMContentLoaded", function() {
    // Live Clock
    function updateClock() {
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        const dateString = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        document.getElementById("clock").innerText = `${timeString}\n${dateString}`;
    }
    setInterval(updateClock, 1000);
    updateClock();

    // Fetch Daily Quote
    fetch("project.json")
        .then(response => response.json())
        .then(data => {
            document.getElementById("quote").innerText = data.quote;
        })
        .catch(error => console.error("Error fetching quote:", error));
});
