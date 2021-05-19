import { loadPageVisitList } from "./modules/tracking.js";
import { menuPages } from "./modules/static-content.js";

/**
 * Fills the visit history from the specified storage
 * @param {Storage} storage
 */
function createHistoryTable(containerId, storage) {
  const history = loadPageVisitList(storage);

  const container = document.getElementById(containerId);

  for (const page of menuPages) {
    const pageName = `/${page.href}`;
    const title = page.title;

    const counter = history[pageName] == null ? 0 : history[pageName];
    container.innerHTML += `<div>${title}</div><div>${pageName}</div><div>${counter}</div>`;
  }
}

window.addEventListener("load", () => {
  createHistoryTable("session-history", window.sessionStorage);
  createHistoryTable("local-history", window.localStorage);
});
