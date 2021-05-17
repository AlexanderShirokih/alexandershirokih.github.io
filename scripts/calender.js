const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const years = [
  ...(function* () {
    for (let i = 1920; i <= new Date().getFullYear(); i++) yield i;
  })(),
];

const months = [
  "January",
  "Febraury",
  "March",
  "April",
  "May",
  "Juny",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

class Calendar {

  constructor(date) {
    this.date = date;
  }

  get year() {
    return document.getElementById("year");
  }

  get month() {
    return document.getElementById("month");
  }

  get days() {
    return document.getElementById("calendar-days");
  }

  get dows() {
    return document.getElementById("calendar-dows");
  }

  get dateInput() {
    return document.getElementById("date");
  }

  updateCalendar() {
    var format = `${
      this.date.getMonth() + 1
    }/${this.date.getDate()}/${this.date.getFullYear()}`;

    const year = this.date.getFullYear();
    const month = this.date.getMonth();

    this.dateInput.value = format;
    this.year.value = year;
    this.month.value = month;

    var firstDay = new Date(year, month, 1).getDay();
    var daysInMonth = new Date(year, month + 1, 0).getDate();

    this.days.innerHTML = "";

    for (let i = 0; i < firstDay; i++) {
      this.days.innerHTML += `<li> </li>`;
    }

    for (let i = 1; i <= daysInMonth; i++) {
      let li = document.createElement("li");
      li.innerText = i;
      li.addEventListener("click", () => {
        this.date.setDate(i);
        this.updateCalendar();
      });
      this.days.appendChild(li);
    }
  }

  init() {
    this.dows.innerHTML += daysOfWeek.map((dow) => `<li>${dow}</li>`).join("");

    this.year.addEventListener("change", (event) => {
      this.date.setFullYear(event.target.value);
      this.updateCalendar();
    });

    this.month.addEventListener("change", (event) => {
      this.date.setMonth(event.target.value);
      this.updateCalendar();
    });

    this.dateInput.addEventListener("input", (event) => {
      const regexp = /\d{1,2}\/\d{1,2}\/\d{4}/;
      const value = event.target.value;

      if (value == "") {
        this.date = new Date();
        this.updateCalendar();
      }

      var d = new Date(value);

      if (
        value.match(regexp) &&
        d.getFullYear() >= years[0] &&
        d.getFullYear() <= years[years.length - 1]
      ) {
        this.date = d;
        this.updateCalendar();
      }
    });

    createOptions(this.year, years, (_i, v) => v);
    createOptions(this.month, months, (i, _m) => i);

    this.updateCalendar();

    function createOptions(select, values, valueSelector) {
      for (var i = 0; i < values.length; i++) {
        var opt = document.createElement("option");
        opt.innerText = values[i];
        opt.value = valueSelector(i, values[i]);
        select.appendChild(opt);
      }
    }
  }
}

var calendar = new Calendar(new Date());

function initDatePicker() {
  let picker = document.getElementById("date-picker");
  let pickerButton = picker.getElementsByClassName("pick-button")[0];

  pickerButton.addEventListener("click", () => {
    let calendarDiv = picker.getElementsByClassName("calendar")[0];
    toggleCalendar(calendarDiv);
  });

  calendar.init();
}

function toggleCalendar(calendar) {
  calendar.classList.toggle("calendar-unfold");
}

window.addEventListener("load", () => {
  initDatePicker();
});
