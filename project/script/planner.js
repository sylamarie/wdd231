// Selecting all the necessary DOM elements
const calendar = document.querySelector(".calendar"),
  date = document.querySelector(".date"),
  daysContainer = document.querySelector(".days"),
  prev = document.querySelector(".prev"),
  next = document.querySelector(".next"),
  todayBtn = document.querySelector(".today-btn"),
  gotoBtn = document.querySelector(".goto-btn"),
  dateInput = document.querySelector(".date-input"),
  eventDay = document.querySelector(".event-day"),
  eventDate = document.querySelector(".event-date"),
  eventsContainer = document.querySelector(".events"),
  addEventSubmit = document.querySelector(".add-event-btn");

// Initialize today's date and default values for month and year
let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

// Array of month names
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Events array and retrieve saved events from localStorage
let eventsArr = [];
getEvents();

// Initialize the calendar UI with correct days and event markers
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

  // Add previous month's trailing days
  for (let x = day; x > 0; x--) {
    days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
  }

  // Add current month's days and mark today's date and events
  for (let i = 1; i <= lastDate; i++) {
    let event = false;
    eventsArr.forEach((eventObj) => {
      if (eventObj.day === i && eventObj.month === month + 1 && eventObj.year === year) {
        event = true;
      }
    });

    // Highlight today's date
    if (i === new Date().getDate() && year === new Date().getFullYear() && month === new Date().getMonth()) {
      activeDay = i;
      getActiveDay(i);
      updateEvents(i);
      days += `<div class="day today active${event ? " event" : ""}">${i}</div>`;
    } else {
      days += `<div class="day${event ? " event" : ""}">${i}</div>`;
    }
  }

  // Add next month's leading days
  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date">${j}</div>`;
  }

  daysContainer.innerHTML = days;
  addListener(); // Add event listeners to the days
}

// Initialize calendar on load
initCalendar();

// Function to go to previous month
function prevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  initCalendar();
}

// Function to go to next month
function nextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  initCalendar();
}

// Event listeners for month navigation buttons and "Today" button
prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);
todayBtn.addEventListener("click", () => {
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  initCalendar();
});

// Formatting input for custom date
dateInput.addEventListener("input", (e) => {
  let numbersOnly = dateInput.value.replace(/[^0-9]/g, "");
  if (numbersOnly.length >= 3) {
    dateInput.value = numbersOnly.slice(0, 2) + "/" + numbersOnly.slice(2, 6);
  } else if (numbersOnly.length >= 1) {
    dateInput.value = numbersOnly;
  }
  if (dateInput.value.length > 7) {
    dateInput.value = dateInput.value.slice(0, 7);
  }
  if (e.inputType === "deleteContentBackward" && dateInput.value.length === 3) {
    dateInput.value = dateInput.value.slice(0, 2);
  }
});

// "Go to" button event to jump to specific month/year
gotoBtn.addEventListener("click", gotoDate);

function gotoDate() {
  const dateArr = dateInput.value.split("/");
  if (dateArr.length === 2) {
    if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
      month = dateArr[0] - 1;
      year = parseInt(dateArr[1]);
      initCalendar();
      return;
    }
  }
  alert("Invalid date");
}

// Elements for adding a new event
const addEventBtn = document.querySelector(".add-event"),
  addEventContainer = document.querySelector(".add-event-wrapper"),
  addEventCloseBtn = document.querySelector(".close"),
  addEventTitle = document.querySelector(".event-name"),
  addEventFrom = document.querySelector(".event-time-from"),
  addEventTo = document.querySelector(".event-time-to");

// Toggle add event form visibility
addEventBtn.addEventListener("click", () => {
  addEventContainer.classList.toggle("active");
});

addEventCloseBtn.addEventListener("click", () => {
  addEventContainer.classList.remove("active");
});

// Close event form if clicked outside
document.addEventListener("click", (e) => {
  if (e.target !== addEventBtn && !addEventContainer.contains(e.target)) {
    addEventContainer.classList.remove("active");
  }
});

// Limit event title length to 50 characters
addEventTitle.addEventListener("input", () => {
  addEventTitle.value = addEventTitle.value.slice(0, 50);
});

// Validate and format time inputs
[addEventFrom, addEventTo].forEach((input) => {
  input.addEventListener("input", (e) => {
    input.value = input.value.replace(/[^0-9:]/g, "");
    if (input.value.length === 2) input.value += ":";
    if (input.value.length > 5) input.value = input.value.slice(0, 5);
  });
});

// Add click listener to each day in calendar
function addListener() {
  const days = document.querySelectorAll(".day");
  days.forEach((dayEl) => {
    dayEl.addEventListener("click", (e) => {
      const clickedDay = Number(e.target.innerText);
      days.forEach((day) => day.classList.remove("active"));

      // Handle previous month day click
      if (e.target.classList.contains("prev-date")) {
        prevMonth();
        setTimeout(() => {
          const newDays = document.querySelectorAll(".day");
          newDays.forEach((d) => {
            if (!d.classList.contains("prev-date") && Number(d.innerText) === clickedDay) {
              d.classList.add("active");
              activeDay = clickedDay;
              getActiveDay(clickedDay);
              updateEvents(clickedDay);
            }
          });
        }, 100);
      }
      // Handle next month day click
      else if (e.target.classList.contains("next-date")) {
        nextMonth();
        setTimeout(() => {
          const newDays = document.querySelectorAll(".day");
          newDays.forEach((d) => {
            if (!d.classList.contains("next-date") && Number(d.innerText) === clickedDay) {
              d.classList.add("active");
              activeDay = clickedDay;
              getActiveDay(clickedDay);
              updateEvents(clickedDay);
            }
          });
        }, 100);
      }
      // Handle current month day click
      else {
        e.target.classList.add("active");
        activeDay = clickedDay;
        getActiveDay(clickedDay);
        updateEvents(clickedDay);
      }
    });
  });
}

// Display selected date and day name
function getActiveDay(date) {
  const day = new Date(year, month, date);
  const dayName = day.toString().split(" ")[0];
  eventDay.innerHTML = dayName;
  eventDate.innerHTML = `${date} ${months[month]} ${year}`;
}

// Display events for the selected day
function updateEvents(date) {
  let eventsHTML = "";
  let found = false;
  eventsArr.forEach((eventObj) => {
    if (eventObj.day === date && eventObj.month === month + 1 && eventObj.year === year) {
      eventObj.events.forEach((event) => {
        eventsHTML += `
          <div class="event">
            <div class="title">
              <i class="fas fa-circle"></i>
              <h3 class="event-title">${event.title}</h3>
            </div>
            <div class="event-time">
              <span>${event.time}</span>
            </div>
          </div>
        `;
        found = true;
      });
    }
  });
  if (!found) {
    eventsHTML = `<div class="no-event"><h3>No Events</h3></div>`;
  }
  eventsContainer.innerHTML = eventsHTML;
  saveEvents(); // Save events after updating
}

// Add a new event
addEventSubmit.addEventListener("click", () => {
  const eventTitle = addEventTitle.value;
  const eventTimeFrom = addEventFrom.value;
  const eventTimeTo = addEventTo.value;

  // Validate input fields
  if (eventTitle === "" || eventTimeFrom === "" || eventTimeTo === "") {
    alert("Please fill all the fields");
    return;
  }

  const timeFromArr = eventTimeFrom.split(":");
  const timeToArr = eventTimeTo.split(":");

  // Validate time format
  if (
    timeFromArr.length != 2 ||
    timeToArr.length != 2 ||
    timeFromArr[0] > 23 ||
    timeFromArr[1] > 59 ||
    timeToArr[0] > 23 ||
    timeToArr[1] > 59
  ) {
    alert("Invalid Time Format");
    return;
  }

  const timeFrom = convertTime(eventTimeFrom);
  const timeTo = convertTime(eventTimeTo);

  const newEvent = {
    title: eventTitle,
    time: timeFrom + " - " + timeTo,
  };

  // Add new event to correct day
  let eventAdded = false;
  if (eventsArr.length > 0) {
    eventsArr.forEach((item) => {
      if (item.day === activeDay && item.month === month + 1 && item.year === year) {
        item.events.push(newEvent);
        eventAdded = true;
      }
    });
  }

  if (!eventAdded) {
    eventsArr.push({ day: activeDay, month: month + 1, year: year, events: [newEvent] });
  }

  // Clear input fields and close modal
  addEventContainer.classList.remove("active");
  addEventTitle.value = "";
  addEventFrom.value = "";
  addEventTo.value = "";
  updateEvents(activeDay);

  // Mark the day as having an event
  const activeDayElem = document.querySelector(".day.active");
  if (!activeDayElem.classList.contains("event")) {
    activeDayElem.classList.add("event");
  }
});

// Convert time from 24-hour to 12-hour AM/PM format
function convertTime(time) {
  let timeArr = time.split(":");
  let timeHour = parseInt(timeArr[0]);
  let timeMin = timeArr[1];
  let timeFormat = timeHour >= 12 ? "PM" : "AM";
  timeHour = timeHour % 12 || 12;
  return timeHour + ":" + timeMin + " " + timeFormat;
}

// Save events array to localStorage
function saveEvents() {
  localStorage.setItem("events", JSON.stringify(eventsArr));
}

// Retrieve saved events from localStorage
function getEvents() {
  if (localStorage.getItem("events")) {
    eventsArr = JSON.parse(localStorage.getItem("events"));
  }
}

// Handle click on event to delete it
eventsContainer.addEventListener("click", (e) => {
  if (e.target.closest(".event")) {
    const eventTitle = e.target.closest(".event").querySelector(".event-title").innerText;

    // Remove the clicked event
    eventsArr.forEach((eventObj) => {
      if (eventObj.day === activeDay && eventObj.month === month + 1 && eventObj.year === year) {
        eventObj.events = eventObj.events.filter((e) => e.title !== eventTitle);
        if (eventObj.events.length === 0) {
          eventsArr = eventsArr.filter(
            (e) => !(e.day === activeDay && e.month === month + 1 && e.year === year)
          );
        }
      }
    });

    updateEvents(activeDay);

    // Remove event marker if no events left on the day
    const activeDayElem = document.querySelector(".day.active");
    if (
      activeDayElem.classList.contains("event") &&
      !eventsArr.some(
        (e) => e.day === activeDay && e.month === month + 1 && e.year === year
      )
    ) {
      activeDayElem.classList.remove("event");
    }
  }
});
