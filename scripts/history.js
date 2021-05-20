import { loadPageVisitList } from "./modules/tracking.js";
import { menuPages } from "./modules/static-content.js";

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

$(function () {
  createHistoryTable($("#session-history"), window.sessionStorage);
  createHistoryTable($("#local-history"), window.localStorage);
});
