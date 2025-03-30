document.addEventListener("DOMContentLoaded", function() {
    // Make navigation bar highlight active section
    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", function() {
            document.querySelectorAll("nav a").forEach(item => item.classList.remove("active"));
            this.classList.add("active");
        });
    });

    // Live Clock
    function updateClock() {
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        document.getElementById("clock").innerText = timeString;
    }
    setInterval(updateClock, 1000);
    updateClock();

    // To-Do List
    function addTask() {
        let task = document.getElementById("new-task").value;
        if (task) {
            let li = document.createElement("li");
            li.innerText = task;
            document.getElementById("task-list").appendChild(li);
            document.getElementById("new-task").value = ""; // Clear input
        }
    }
    window.addTask = addTask;

    // Daily Goals
    function addGoal() {
        let goal = document.getElementById("new-goal").value;
        if (goal) {
            let li = document.createElement("li");
            li.innerText = goal;
            document.getElementById("goal-list").appendChild(li);
            document.getElementById("new-goal").value = ""; // Clear input
        }
    }
    window.addGoal = addGoal;

    // Budget Tracker (Persistent Storage)
    function addBudget() {
        let desc = document.getElementById("budget-desc").value;
        let amount = document.getElementById("budget-amount").value;
        if (desc && amount) {
            let li = document.createElement("li");
            li.innerHTML = `${desc}: $${amount} <button onclick="deleteBudget(this)">Delete</button>`;
            document.getElementById("budget-list").appendChild(li);
            saveBudgets();
            document.getElementById("budget-desc").value = ""; // Clear input
            document.getElementById("budget-amount").value = ""; // Clear input
        }
    }
    window.addBudget = addBudget;

    function deleteBudget(btn) {
        btn.parentElement.remove();
        saveBudgets();
    }
    window.deleteBudget = deleteBudget;

    function saveBudgets() {
        let budgets = document.getElementById("budget-list").innerHTML;
        localStorage.setItem("budgets", budgets);
    }

    function loadBudgets() {
        document.getElementById("budget-list").innerHTML = localStorage.getItem("budgets") || "";
    }
    loadBudgets();

    // Fetch Daily Quote
    fetch("project.json")
        .then(response => response.json())
        .then(data => {
            document.getElementById("quote").innerText = data.quote;
        })
        .catch(error => console.error("Error fetching quote:", error));
});
