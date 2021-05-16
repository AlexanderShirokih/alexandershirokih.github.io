function validateQuizForm() {
  var items = [...document.forms["quiz"]["q3"]];
  var isValid = items.filter((i) => i.checked).length >= 2;

  if (!isValid) {
      alert("В вопросе №3 нужно выбрать хотя бы 2 пункта!");
    return false;
  }
  return true;
}
