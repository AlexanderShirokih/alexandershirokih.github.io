/**
 * Abstract field validator used to validate a single field
 */
class Validator {
  /**
   * Checks field for validity.
   * @param {JQuery<HTMLElement>} element HTMLElement to be validated
   * @returns {boolean} `true` is field completes validation successfully
   */
  isValid(element) {
    return false;
  }

  /**
   * Gets an error if field validation fails
   */
  get error() {
    return "";
  }
}

/**
 * Validator that validates fields used regular expressions
 */
class PatternValidator extends Validator {
  #pattern;

  /**
   * Constructs [PatternValidator] using RegExp pattern
   * @param {String} pattern pattern for validation
   */
  constructor(pattern) {
    super();
    this.#pattern = pattern;
  }

  isValid(element) {
    return (element.val() || "").match(this.#pattern);
  }

  get error() {
    return "Значение не соответствует правилам";
  }
}

/**
 * Requires a string to be not empty
 */
class NotEmptyValidator extends Validator {
  isValid(element) {
    return element.val();
  }

  get error() {
    return "Поле не должно быть пустым";
  }
}

/**
 * Checks that any radio input in the group inside the given container is checked.
 */
class RadioGroupValidator extends Validator {
  isValid(element) {
    return element.children("input[type=radio]:checked").val();
  }

  get error() {
    return "Значение не выбрано";
  }
}

/**
 * Validates a checkbox group to have at least certain amount of checked items
 */
class CheckboxValidator extends Validator {
  #checkedCount;

  constructor(checkedCount) {
    super();
    this.#checkedCount = checkedCount;
  }

  isValid(element) {
    return (
      element.children("input[type=checkbox]:checked").length >=
      this.#checkedCount
    );
  }

  get error() {
    return `Нужно выбрать хотя бы ${this.#checkedCount} пункта!`;
  }
}

/**
 * Describes a single field of the form
 */
class FormField {
  #id;
  #validator;

  /**
   * Constructs new form field by It's ID, and validator
   * @param {String} id element ID in the DOM tree
   * @param {Validator} validator for checking validity
   */
  constructor(id, validator) {
    this.#id = id;
    this.#validator = validator;
  }

  /**
   * Gets HTMLElement object
   */
  get element() {
    return $("#" + this.#id);
  }

  /**
   * Returns `true` if this field value is valid
   */
  get isValid() {
    return this.#validator.isValid(this.element);
  }

  /**
   * Checks field for validity and appends error span before this element
   * if the field has an error.
   */
  validate() {
    const errorId = `error_for_${this.#id}`;

    $("#" + errorId).remove();

    if (this.isValid) {
      return;
    }

    const newErrorNode = $("<span/>", {
      id: errorId,
      class: "errorHint",
      text: this.#validator.error,
    });

    newErrorNode.insertBefore(this.element);
  }
}

/**
 * Describes form with it's fields for validation
 */
class Form {
  #fields;
  #onFormValidationChanged;

  /**
   * Constructs new Form with its fields
   * @param {Array<FormField>} fields form the array of fields
   * @param onFormValidationChanged closure called when form validation state changed.
   */
  constructor(fields, onFormValidationChanged) {
    this.#fields = fields;
    this.#onFormValidationChanged = onFormValidationChanged;
  }

  /**
   * Assigns `focusout` listeners to all fields to validate them when the event is triggered.
   */
  addListeners() {
    this.#validate();

    this.#fields.forEach((field) => {
      const input = field.element;
      input.on("focusout", () => {
        input.attr("class", field.isValid ? "valid" : "invalid");
        field.validate();
        this.#validate();
      });
    });
  }

  /**
   * Validates all fields of the form
   * @returns `true` if `all` fields are valid.
   */
  get isValid() {
    return this.#fields.every((field) => field.isValid);
  }

  /**
   * Validates all the form fields and disables submit button if the form has errors.
   */
  #validate() {
    this.#onFormValidationChanged(this.isValid);
  }
}

export {
  Form,
  FormField,
  Validator,
  PatternValidator,
  CheckboxValidator,
  RadioGroupValidator,
  NotEmptyValidator,
};
