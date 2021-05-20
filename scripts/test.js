import {
  Form,
  FormField,
  CheckboxValidator,
  PatternValidator,
  NotEmptyValidator,
} from "./modules/validation.js";

const quizForm = new Form(
  [
    new FormField("name", new PatternValidator(/[А-я]+ [А-я]+ [А-я]+/)),
    new FormField("group", new NotEmptyValidator()),
    new FormField("q1", new NotEmptyValidator()),
    new FormField("q2", new NotEmptyValidator()),
    new FormField("q3", new CheckboxValidator(2)),
  ],
  (isValid) =>
    $("#test-submit")
      .attr("disabled", !isValid)
      .attr("class", isValid ? "" : "inactive")
);

$(() => quizForm.addListeners());
