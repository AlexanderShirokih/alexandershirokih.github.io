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

function inflateMenu() {
  const pages = [
    {
      href: "index.html",
      title: "Главная",
    },
    {
      href: "about.html",
      title: "Обо мне",
    },
    {
      href: "iterests.html",
      title: "Мои интересы",
    },
    {
      href: "study.html",
      title: "Учеба",
    },
    {
      href: "photos.html",
      title: "Фотоальбом",
    },
    {
      href: "contacts.html",
      title: "Контакт",
    },
    {
      href: "test.html",
      title: "Тест по дисциплине",
    },
  ];

  let ul = document.createElement("ul");

  for (const page of pages) {
    let entry = document.createElement("li");
    entry.innerHTML = `<a href="${page.href}">${page.title}</a>`;
    ul.appendChild(entry);
  }
  document.getElementById("menu").appendChild(ul);
}

window.addEventListener("load", () => {
  inflateMenu();
});
