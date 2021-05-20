import {
  Form,
  FormField,
  PatternValidator,
  RadioGroupValidator,
  NotEmptyValidator,
} from "./modules/validation.js";

import { Calendar } from "./modules/calendar.js";

const contactsForm = new Form(
  [
    new FormField("name", new PatternValidator(/[А-я]+ [А-я]+ [А-я]+/)),
    new FormField("email", new PatternValidator(/\w{2,25}\@\w{2,12}\.\w{2,4}/)),
    new FormField("phone", new PatternValidator(/\+[73]\d{9,11}/)),
    new FormField("date", new PatternValidator(/\d{1,2}\/\d{1,2}\/\d{4}/)),
    new FormField("gender", new RadioGroupValidator()),
    new FormField("age", new NotEmptyValidator()),
  ],
  (isValid) =>
    $("#contacts-submit")
      .attr("disabled", !isValid)
      .attr("class", isValid ? "" : "inactive")
);

const calendar = new Calendar(new Date());

$(() => {
  contactsForm.addListeners();
  calendar.setup();
});
