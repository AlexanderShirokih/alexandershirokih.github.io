function inflatePictures() {
  var picsContainer = document.getElementById("rand-pictures");
  for (let i = 1; i <= 15; i++) {
    let wrapper = document.createElement("div");
    let img = document.createElement("img");
    img.src = `imgs/posts/pic${i}.jpg`;
    img.alt = "Random picture";

    let tooltip = document.createElement("span");
    tooltip.innerText = `Random picture ${i}`;

    wrapper.appendChild(img);
    wrapper.appendChild(tooltip);

    picsContainer.appendChild(wrapper);
  }
}

window.addEventListener("load", () => {
  inflatePictures();
});
