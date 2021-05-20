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
    return $("#year");
  }

  get month() {
    return $("#month");
  }

  get days() {
    return $("#calendar-days");
  }

  get dows() {
    return $("#calendar-dows");
  }

  get dateInput() {
    return $("#date");
  }

  #updateCalendar() {
    const date = this.date.getDate();
    const year = this.date.getFullYear();
    const month = this.date.getMonth();

    var format = `${month + 1}/${date}/${year}`;

    this.dateInput.val(format);
    this.year.val(year);
    this.month.val(month);

    var firstDay = new Date(year, month, 1).getDay();
    var daysInMonth = new Date(year, month + 1, 0).getDate();

    this.days.empty();

    $.each(Array(firstDay), () => {
      $(`<li/>`, { text: " " }).appendTo(this.days);
    });

    for (let i = 1; i <= daysInMonth; i++) {
      $("<li/>", { text: i })
        .on("click", () => {
          this.date.setDate(i);
          this.#updateCalendar();
        })
        .appendTo(this.days);
    }
  }

  setup() {
    $("#date-picker .pick-button").on("click", () =>
      $("#date-picker .calendar").toggleClass("calendar-unfold")
    );

    this.dows.append(daysOfWeek.map((dow) => $(`<li>${dow}</li>`)));

    this.year.on("change", (event) => {
      this.date.setFullYear(event.target.value);
      this.#updateCalendar();
    });

    this.month.on("change", (event) => {
      this.date.setMonth(event.target.value);
      this.#updateCalendar();
    });

    this.dateInput.on("input", (event) => {
      const regexp = /\d{1,2}\/\d{1,2}\/\d{4}/;
      const value = event.target.value;

      if (value == "") {
        this.date = new Date();
        this.#updateCalendar();
      }

      var d = new Date(value);

      if (
        value.match(regexp) &&
        d.getFullYear() >= years[0] &&
        d.getFullYear() <= years[years.length - 1]
      ) {
        this.date = d;
        this.#updateCalendar();
      }
    });

    createOptions(this.year, years, (_i, v) => v);
    createOptions(this.month, months, (i, _m) => i);

    this.#updateCalendar();

    function createOptions(select, values, valueSelector) {
      select.append(
        values.map((value, index) =>
          $("<option/>", {
            text: value,
            value: valueSelector(index, value),
          })
        )
      );
    }
  }
}

export { Calendar };
