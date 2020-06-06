function hideFooter() { document.getElementsByTagName("footer")[0].remove(); }

function inflatePictures() {
    var picsContainer = document.getElementById("rand-pictures");
    for (let i = 1; i <= 6; i++) {
        let wrapper = document.createElement("div");
        let img = document.createElement("img");
        img.src = `imgs/posts/pic${i}.jpg`;
        img.onclick = function () { expandImage(wrapper) };
        wrapper.appendChild(img);
        picsContainer.appendChild(wrapper);
    }
}

function expandImage(wrapper) {
    const classList = wrapper.classList;
    if (classList.contains('img-expanded'))
        classList.remove('img-expanded');
    else
        classList.add('img-expanded');
}

function writePost() {
    let textarea = document.getElementById('post-text');
    if(textarea.value.length > 0) {
        let section = document.createElement('section');
        section.innerHTML = `<span class="date">${new Date().toLocaleString()}</span><p>${textarea.value}</p>`;
        section.classList.add('right-post');
        document.getElementsByTagName('article')[0].appendChild(section);
        textarea.value = "";
    }
}