import { interests } from "./modules/static-content.js";

function inflateInterests() {
  let main = document.getElementById("interersts-main");

  let interestsContentList = document.createElement("ul");

  for (const interest of interests) {
    let contentEntry = document.createElement("li");
    contentEntry.innerHTML = `<a href="#${interest.id}">${interest.header.title}</a>`;
    interestsContentList.appendChild(contentEntry);
  }

  main.appendChild(
    createArticle({
      header: {
        img: "imgs/interests_bg.png",
        title: "Мои интересы",
      },
      content: interestsContentList,
    })
  );

  interests.forEach(function (interest) {
    main.appendChild(createArticle(interest));
  });
}

function createArticle(data) {
  let article = document.createElement("article");

  if (data.hasOwnProperty("id")) {
    article.id = data.id;
  }

  if (data.hasOwnProperty("header")) {
    let header = document.createElement("section");
    header.classList.add("content-header");
    let img = document.createElement("img");
    img.src = data.header.img;
    img.alt = data.header.title;
    header.appendChild(img);

    let title = document.createElement("h1");
    title.innerText = data.header.title;
    header.appendChild(title);

    article.appendChild(header);
  }

  if (data.content instanceof Node) {
    article.appendChild(data.content);
  } else {
    article.innerHTML += data.content;
  }
  return article;
}

window.addEventListener("load", () => {
  inflateInterests();
});
