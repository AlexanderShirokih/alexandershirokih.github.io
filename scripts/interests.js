import { interests } from "./modules/static-content.js";
import { createSmartPopover } from "./modules/modal.js";

$(() => {
  $("#interersts-main")
    .append(
      createArticle({
        header: {
          img: "imgs/interests_bg.png",
          title: "Мои интересы",
        },
        content: $("<ul/>").append(
          interests.map((interest) =>
            $("<li/>").append(
              $("<a/>", {
                href: `#${interest.id}`,
                text: interest.header.title,
              })
            )
          )
        ),
      })
    )
    .append(interests.map((interest) => createArticle(interest)));

  $("span").each(function () {
    createSmartPopover($(this));
  });
});

function createArticle(data) {
  const article = $("<article/>").attr("id", data.id);

  if (data.hasOwnProperty("header")) {
    article.append(
      $("<section/>")
        .addClass("content-header")
        .append(
          $("<img/>", {
            src: data.header.img,
            alt: data.header.title,
          })
        )
        .append($("<h1/>", { text: data.header.title }))
    );
  }

  return article.append(data.content);
}
