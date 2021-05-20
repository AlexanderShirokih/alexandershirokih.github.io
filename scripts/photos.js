$(() => {
  const picsContainer = $("#rand-pictures");

  $.each(Array(15), (i) => {
    const parent = $("<div/>");

    parent
      .on("click", () => parent.toggleClass("zoomed"))
      .append(
        $("<img/>", {
          src: `imgs/posts/pic${i + 1}.jpg`,
          alt: "Random picture",
        })
      )
      .append($("<span/>", { text: `Random picture ${i + 1}` }))
      .appendTo(picsContainer);
  });
});
