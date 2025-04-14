const calendar = document.querySelector(".calendar"),
    date = document.querySelector(".date"),
    daysContainer = document.querySelector(".days"),
    prev = document.querySelector(".prev"),
    next = document.querySelector(".next"),
    todayBtn = document.querySelector(".today-btn"),
    gotoBtn = document.querySelector(".goto-btn"),
    dateInput = document.querySelector(".date-input");

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
];

// default events array
const eventsArr = [
    {
        day: 15,
        month: 4,
        year: 2025,
        events : [
            {
                title: "Event 1 lorem jhds iahsd kashd",
                time: "10:00 AM",
            },
            {
                title: "Event 2",
                time: "11:00 AM",
            },
        ],
    },
    {
        day: 18,
        month: 4,
        year: 2025,
        events : [
            {
                title: "Event 1 lorem jhds iahsd kashd",
                time: "10:00 AM",
            },
        ],
    },
];

function initCalendar() {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay() - 1;

    date.innerHTML = `${months[month]} ${year}`;

    let days = "";

    for (let x = day; x > 0; x--) {
        days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
    }

    for (let i = 1; i <= lastDate; i++) {

        // check if event present on current day
        let event = false;
        eventsArr.forEach((eventObj) => {
            if(
                eventObj.day === i &&
                eventObj.month === month + 1 &&
                eventObj.year === year
            )
            {
                // if event found
                event = true;
            }
        });

        if (
            i === new Date().getDate() &&
            year === new Date().getFullYear() &&
            month === new Date().getMonth()
        ) {
            // iff event found also add event class
            if (event) {
                days += `<div class="day today event" >${i}</div>`;
            } else {
                days += `<div class="day today" >${i}</div>`;
            }
        } 
        // add remaining as it is
        else {
            if (event) {
                days += `<div class="day event" >${i}</div>`;
            } else {
                days += `<div class="day" >${i}</div>`;
            }
        }
    }

    for (let j = 1; j <= nextDays; j++) {
        days += `<div class="day next-date">${j}</div>`;
    }

    daysContainer.innerHTML = days;
    // add listner after calendar initialized
    addListener();
}

initCalendar();

// prev month 
function prevMonth() {
    month--;
    if (month < 0) {
        month = 11;
        year--;
    }
    initCalendar();
}

// next month
function nextMonth() {
    month++;
    if (month > 11) {
        month = 0;
        year++;
    }
    initCalendar();
}

// add event list on prev and next
prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

// add goto date and goto today functionality
todayBtn.addEventListener("click", () => {
    today = new Date();
    month = today.getMonth();
    year =today.getFullYear();
    initCalendar();
})

dateInput.addEventListener("input", (e) => {
    // Step 1: Remove all non-digit characters
    let numbersOnly = dateInput.value.replace(/[^0-9]/g, "");

    // Step 2: Rebuild value with slash after MM if enough digits
    if (numbersOnly.length >= 3) {
        dateInput.value = numbersOnly.slice(0, 2) + "/" + numbersOnly.slice(2, 6);
    } else if (numbersOnly.length >= 1) {
        dateInput.value = numbersOnly;
    }

    // Step 3: Prevent input longer than 7 chars (MM/YYYY)
    if (dateInput.value.length > 7) {
        dateInput.value = dateInput.value.slice(0, 7);
    }

    // Step 4: Handle backspace from slash position
    if (e.inputType === "deleteContentBackward" && dateInput.value.length === 3) {
        dateInput.value = dateInput.value.slice(0, 2);
    }
});

gotoBtn.addEventListener("click", gotoDate);

// function to go entered
function gotoDate() {
    const dateArr = dateInput.value.split("/");
    // some date validation
    if(dateArr.length === 2){
        if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
            month = dateArr[0] - 1;
            year = dateArr[1];
            initCalendar();
            return;
        }
    }
    // if invalid date
    alert("invalid date");
}

const addEventBtn = document.querySelector(".add-event"),
    addEventContainer = document.querySelector(".add-event-wrapper"),
    addEventCloseBtn = document.querySelector(".close"),
    addEventTitle = document.querySelector(".event-name"),
    addEventFrom = document.querySelector(".event-time-from"),
    addEventTo = document.querySelector(".event-time-to");

addEventBtn.addEventListener("click", () => {
    addEventContainer.classList.toggle("active");
});

    
addEventCloseBtn.addEventListener("click", () => {
    addEventContainer.classList.remove("active");
});

document.addEventListener("click", (e) => {
    if(e.target != addEventBtn && !addEventContainer.contains(e.target)) {
        addEventContainer.classList.remove("active");
    }
});

// allow only 50 chras in title
addEventTitle.addEventListener("input", (e) => {
    addEventTitle.value = addEventTitle.value.slice(0,50);
});

// timeformat in from and to time
addEventFrom.addEventListener("input", (e) => {
    // remove anything else numbers
    addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, "");
    // if two numbers entered auto add:
    if (addEventFrom.value.length === 2) {
        addEventFrom.value += ":";
    }
    // don't let user enter more than 5 chars
    if (addEventFrom.value.length > 5) {
        addEventFrom.value = addEventFrom.value.slice(0, 5);
    }
});

// same with to time
addEventTo.addEventListener("input", (e) => {
    // remove anything else numbers
    addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, "");
    // if two numbers entered auto add:
    if (addEventTo.value.length === 2) {
        addEventTo.value += ":";
    }
    // don't let user enter more than 5 chars
    if (addEventTo.value.length > 5) {
        addEventTo.value = addEventTo.value.slice(0, 5);
    }
});

// lets create function to add listner on days after rendered
function addListener() {
    const days = document.querySelectorAll(".day"); // <- fix here
    days.forEach((day) => {
        day.addEventListener("click", (e) => {
            const clickedDay = Number(e.target.innerHTML);
            activeDay = clickedDay;

            days.forEach((day) => {
                day.classList.remove("active");
            });

            if (e.target.classList.contains("prev-date")) {
                prevMonth();
                setTimeout(() => {
                    const days = document.querySelectorAll(".day");
                    days.forEach((day) => {
                        if (
                            !day.classList.contains("prev-date") &&
                            Number(day.innerHTML) === clickedDay
                        ) {
                            day.classList.add("active");
                        }
                    });
                }, 100);
            } else if (e.target.classList.contains("next-date")) {
                nextMonth();
                setTimeout(() => {
                    const days = document.querySelectorAll(".day");
                    days.forEach((day) => {
                        if (
                            !day.classList.contains("next-date") &&
                            Number(day.innerHTML) === clickedDay
                        ) {
                            day.classList.add("active");
                        }
                    });
                }, 100);
            } else {
                e.target.classList.add("active");
            }
        });
    });
}
