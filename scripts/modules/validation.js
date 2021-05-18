/**
 * Abstract field validator used to validate a single field
 */
class Validator {
  /**
   * Checks field for validity.
   * @param {HTMLElement} element HTMLElement to be validated
   * @returns {boolean} `true` is field completes validation sucessfully
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
   * Constructs [ParrernValidator] using RegExp pattern
   * @param {String} pattern parrern for validation
   */
  constructor(pattern) {
    super();
    this.#pattern = pattern;
  }

  isValid(element) {
    return element.value.match(this.#pattern);
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
    return element.value;
  }

  get error() {
    return "Поле не должно быть пустым";
  }
}

/**
 * Checks that the any radio input in group inside the given container is checked.
 */
class RadioGroupValidator extends Validator {
  isValid(element) {
    let radios = [...element.querySelectorAll("input[type=radio]")];
    return radios.find((e) => e.checked) != undefined;
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
    let checkboxes = [...element.querySelectorAll("input[type=checkbox]")];
    return checkboxes.filter((e) => e.checked).length >= this.#checkedCount;
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
    return document.getElementById(this.#id);
  }

  /**
   * Returns `true` if this field value is valid
   */
  get isValid() {
    return this.#validator.isValid(this.element);
  }

  /**
   * Checks field for validity and appends error span before this element
   * if field has an error.
   */
  validate() {
    const input = this.element;
    const form = input.parentNode;

    const errorId = `error_for_${this.#id}`;

    let errorNode = document.getElementById(errorId);

    if (errorNode != null) {
      form.removeChild(errorNode);
    }

    if (this.isValid) {
      return;
    }

    errorNode = document.createElement("span");
    errorNode.id = errorId;
    errorNode.className = "errorHint";
    errorNode.innerText = this.#validator.error;

    form.insertBefore(errorNode, input);
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
   * Assigns `focusout` listeners to all fields to validate them when event is triggered.
   */
  addListeners() {
    this.#validate();

    this.#fields.forEach((field) => {
      let input = field.element;
      input.addEventListener("focusout", () => {
        input.className = field.isValid ? "valid" : "invalid";
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
