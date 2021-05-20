/**
 * Simulates image fetching API call.
 */
function fetchImages() {
  return new Promise((resolve, _) => {
    resolve([
      ...(function* () {
        for (let i = 1; i <= 15; i++)
          yield {
            url: `imgs/posts/pic${i}.jpg`,
            title: `Random picture #${i}`,
          };
      })(),
    ]);
  });
}

var currentImageIndex = 0;

$(() => {
  const picsContainer = $("#rand-pictures");

  function hide() {
    $("#picture-viewer").hide();
  }

  hide();

  $(".preview-close-btn").on("click", () => hide());

  fetchImages().then((imageList) => {
    $(".image-preview-nav-btn.left").on("click", () =>
      switchTo(currentImageIndex - 1, imageList)
    );
    $(".image-preview-nav-btn.right").on("click", () =>
      switchTo(currentImageIndex + 1, imageList)
    );

    imageList.forEach((image, i, array) => {
      $("<div/>")
        .append(
          $("<img/>", {
            src: image.url,
            alt: image.title,
          })
        )
        .appendTo(picsContainer)
        .on("click", () => switchTo(i, array));
    });
  });
});

function switchTo(nextId, data) {
  currentImageIndex = nextId < 0 ? data.length + nextId : nextId % data.length;

  $("#picture-viewer").fadeIn();

  $("#image-preview")
    .fadeOut(0)
    .fadeIn()
    .attr("src", data[currentImageIndex].url)
    .attr("alt", data[currentImageIndex].title);

  $("#image-preview-label").text(
    `Фото ${currentImageIndex + 1} из ${data.length} - ${
      data[currentImageIndex].title
    }`
  );
}
