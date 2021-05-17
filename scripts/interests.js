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

window.addEventListener("load", () => {
  inflateInterests();
});
