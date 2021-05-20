import { loadPageVisitList } from "./modules/tracking.js";
import { menuPages } from "./modules/static-content.js";
import { showInfoDialog } from "./modules/modal.js";

/**
 * Fills the visit history from the specified storage
 * @param {Storage} storage
 */
function createHistoryTable(container, storage) {
  const history = loadPageVisitList(storage);

  for (const page of menuPages) {
    const pageName = `/${page.href}`;
    const title = page.title;

    const counter = history[pageName] == null ? 0 : history[pageName];

    container
      .append($("<div/>", { text: title }))
      .append($("<div/>", { text: pageName }))
      .append($("<div/>", { text: counter }));
  }
}

$(() => {
  createHistoryTable($("#session-history"), window.sessionStorage);
  createHistoryTable($("#local-history"), window.localStorage);

  $("#clear-local-history").on("click", () =>
    showInfoDialog(
      "Очистить локальную историю просмотра",
      "Очистить",
      "Отмена",
      (isOk) => {
        if (isOk) {
          window.localStorage.clear();
          location.reload();
        }
      }
    )
  );
});
