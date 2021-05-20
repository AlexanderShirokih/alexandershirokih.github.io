import { getCurrentPage, incrementPageCounters } from "./modules/tracking.js";
import { menuPages } from "./modules/static-content.js";

function inflateMenu() {
  const ul = $("<ul/>").appendTo($("#menu"));

  let currentPage = getCurrentPage();

  for (const page of menuPages) {
    const entry = $("<li/>").appendTo(ul);

    if (currentPage.includes(page.href)) {
      entry.append(
        $("<span/>", {
          text: page.title,
          class: "menu-active",
        })
      );
    } else if (page.hasOwnProperty("extra")) {
      entry.append(
        $("<span/>", { text: page.title })
          .css("cursor", "poiner")
          .on("click", () => entry.toggleClass("clicked"))
      );

      const submenu = $("<ul/>").addClass("submenu").appendTo(entry);

      for (const subitem of page.extra) {
        $("<li/>")
          .append(
            $("<a/>", {
              href: [page.href, subitem.id].join("#"),
              text: subitem.header.title,
            })
          )
          .appendTo(submenu);
      }
    } else {
      $("<a />", {
        href: page.href,
        text: page.title,
      }).appendTo(entry);
    }
  }
}

function inflateDate() {
  const dateBlock = $("<div/>").addClass("date").appendTo($("header").get(0));

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

    dateBlock.text(`${day}.${month}.${year} ${dow}, ${time}`);
  }

  refreshDate();
  setInterval(refreshDate, 1000);
}

$(() => {
  inflateMenu();
  inflateDate();
  incrementPageCounters();
});
