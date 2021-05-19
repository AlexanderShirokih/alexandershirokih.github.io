import { getCurrentPage, incrementPageCounters } from "./modules/tracking.js";
import { menuPages } from "./modules/static-content.js";

function inflateMenu() {
  let ul = document.createElement("ul");

  let currentPage = getCurrentPage();

  for (const page of menuPages) {
    let entry = document.createElement("li");

    if (currentPage.includes(page.href)) {
      entry.innerHTML = `<span class="menu-active">${page.title}</span>`;
    } else if (page.hasOwnProperty("extra")) {
      entry.innerHTML = `<span style="cursor:pointer;">${page.title}</span>`;

      entry.onclick = function () {
        entry.classList.toggle("clicked");
      };

      var submenu = document.createElement("ul");
      submenu.className = "submenu";

      for (const subitem of page.extra) {
        let li = document.createElement("li");
        li.innerHTML = `<a href="${page.href}#${subitem.id}">${subitem.header.title}</a>`;

        submenu.appendChild(li);
      }
      entry.appendChild(submenu);
    } else {
      var link = document.createElement("a");
      link.href = page.href;
      link.innerText = page.title;
      entry.appendChild(link);
    }

    ul.appendChild(entry);
  }

  document.getElementById("menu").appendChild(ul);
}

function inflateDate() {
  var header = document.getElementsByTagName("header")[0];
  var dateBlock = document.createElement("div");
  dateBlock.className = "date";

  header.appendChild(dateBlock);

  function refreshDate() {
    let date = new Date();
    const dows = [
      "Воскресенье",
      "Понедельник",
      "Вторник",
      "Среда",
      "Четверг",
      "Пятница",
      "Суббота",
    ];
    let day = date.getDate().toString().padStart(2, "0");
    let month = date.getMonth().toString().padStart(2, "0");
    let year = date.getFullYear().toString().substring(2);
    let dow = dows[date.getDay()];
    let time = date.toLocaleTimeString("ru");

    dateBlock.innerText = `${day}.${month}.${year} ${dow}, ${time}`;
  }

  refreshDate();
  setInterval(refreshDate, 1000);
}

window.addEventListener("load", () => {
  inflateMenu();
  inflateDate();
  incrementPageCounters();
});
