document.addEventListener("DOMContentLoaded", function () {
    // Display current date
    function updateDate() {
        const today = new Date();
        document.getElementById("current-date").innerText = today.toDateString();
    }
    updateDate();

    // Generate time slots
    const timeSlots = document.getElementById("timeSlots");
    const hours = ["6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", 
                   "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", 
                   "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM",
                    "9:00 PM", "10:00 PM", "11:00 PM", "12:00 PM",];

    hours.forEach(hour => {
        const timeBlock = document.createElement("div");
        timeBlock.classList.add("time-block");

        const timeLabel = document.createElement("span");
        timeLabel.innerText = hour;

        const taskInput = document.createElement("input");
        taskInput.setAttribute("type", "text");
        taskInput.setAttribute("placeholder", "...");

        timeBlock.appendChild(timeLabel);
        timeBlock.appendChild(taskInput);
        timeSlots.appendChild(timeBlock);
    });

    // Save Notes to Local Storage
    const notesArea = document.getElementById("notes-area");
    notesArea.value = localStorage.getItem("notes") || "";
    
    notesArea.addEventListener("input", function() {
        localStorage.setItem("notes", notesArea.value);
    });
});