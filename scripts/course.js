// Course List Array
const courses = [
    { code: "WDD 130", name: "Web Fundamentals", credits: 2, completed: true },
    { code: "WDD 231", name: "Frontend Development", credits: 2, completed: true },
    { code: "WDD 331", name: "Advanced CSS and JS", credits: 2, completed: true },
    { code: "CSE 110", name: "Programming Building Blocks", credits: 2, completed: true },
    { code: "CSE 111", name: "Programming with Functions", credits: 2, completed: true },
    { code: "CSE 210", name: "Programming with Classes", credits: 2, completed: true },
    { code: "CSE 212", name: "Data Structures", credits: 2, completed: false }
];

// Function to Display Courses
function displayCourses(filter = "all") {
    const courseContainer = document.getElementById("course-link");
    courseContainer.innerHTML = ""; // Clear previous content

    const filteredCourses = courses.filter(course => 
        filter === "all" || 
        (filter === "wdd" && course.code.startsWith("WDD")) || 
        (filter === "cse" && course.code.startsWith("CSE"))
    );

    let totalCredits = 0;

    filteredCourses.forEach(course => {
        totalCredits += course.credits;

        const courseCard = document.createElement("div");
        courseCard.classList.add("course-card");
        courseCard.innerHTML = `
            <h3>${course.code}</h3>
            <p>${course.name}</p>
            <p>Credits: ${course.credits}</p>
        `;

        // Style completed courses differently
        if (course.completed) {
            courseCard.classList.add("completed");
        }

        courseContainer.appendChild(courseCard);
    });

    document.getElementById("total-credits").textContent = totalCredits;
}

// Event Listeners for Buttons
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".certificates button").forEach(button => {
        button.addEventListener("click", () => {
            displayCourses(button.getAttribute("onclick").split("'")[1]);
        });
    });

    // Load all courses by default
    displayCourses("all");
});
