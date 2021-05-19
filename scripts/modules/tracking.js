const visitCountersKey = "visitCounters";

/**
 * Gets path name of the current page
 */
function getCurrentPage() {
  const pathname = window.location.pathname;
  return pathname == "/" ? "/index.html" : pathname;
}

/**
 * Increments page visit counters.
 */
function incrementPageCounters() {
  let currentPage = getCurrentPage();

  incrementCounter(currentPage, window.sessionStorage);
  incrementCounter(currentPage, window.localStorage);
}

function incrementCounter(currentPage, storage) {
  const history = loadPageVisitList(storage);
  const count = history[currentPage];

  history[currentPage] = count == null ? 1 : count + 1;

  storePageVisitList(storage, history);
}

/**
 * Loads a map of pages and it's visit counters
 * @param {Storage} storage - storage to load from
 * @returns {Map<String, Number>} of page names as key and visit count as value.
 */
function loadPageVisitList(storage) {
  const visitList = storage.getItem(visitCountersKey);
  return visitList == null ? {} : JSON.parse(visitList);
}

function storePageVisitList(storage, visitList) {
  storage.setItem(visitCountersKey, JSON.stringify(visitList));
}

export { getCurrentPage, incrementPageCounters, loadPageVisitList };
