const calendar = document.querySelector(".calendar"),
    date = document.querySelector(".date"),
    daysContainer = document.querySelector(".days"),
    prev = document.querySelector(".prev");
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
        if (
            i === today.getDate() &&
            year === today.getFullYear() &&
            month === today.getMonth()
        ) {
            days += `<div class="day today">${i}</div>`;
        } else {
            days += `<div class="day">${i}</div>`;
        }
    }

    for (let j = 1; j <= nextDays; j++) {
        days += `<div class="day next-date">${j}</div>`;
    }

    daysContainer.innerHTML = days;
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