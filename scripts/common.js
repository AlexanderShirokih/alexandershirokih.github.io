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

const interests = [
  {
    id: "mobile",
    header: {
      img: "imgs/interests/bg_android.jpg",
      title: "Мобильная разработка",
    },
    content: `Одним из основных направлений моих интересов является разработка под
        <span>Android</span>. Я начал заниматься этим примерно с 2013 года.
        Мое самое популярное мобильное приложение имеет более 1 миллиона
        установок в <span>Play Market</span>. С данного направления начинается
        мой опыт работы с <span>Java</span> и <span>Kotlin</span>.`,
  },
  {
    id: "os_dev",
    header: {
      img: "imgs/interests/bg_os_dev.jpg",
      title: "Операционные системы",
    },
    content: `Разработка операционных систем является очень сложной и интересной
      темой. Написание ОС с нуля предполагает спользование низкоуровневых
      языков и понимание самых тонких деталей устройства компьютера, что и
      является самоцелью.`,
  },
  {
    id: "flutter",
    header: {
      img: "imgs/interests/bg_flutter.png",
      title: "Flutter",
    },
    content: `<span>Flutter</span> - это кроссплатформенный фреймворк, созданный
      компанией <span>Google</span> для разработки мобильных, десктопных и
      web приложений. Не смотря на то, что <span>Flutter</span> появился
      недавно, но имеет быстрорастущее сообщество и активно развивается. Я
      использую эту технологию как для разаботки мобильных, так и для
      десктопных приложений под <span>Windows</span> и <span>Linux</span>.`,
  },
  {
    id: "3d",
    header: { img: "imgs/interests/bg_3d.jpg", title: "3D Движки" },
    content: `Создание собственного 3д движка было одним из наиболее интересных
  направлений моего пути программиста. В 2013-2014 я написал простой 3д
  движок использующий <span>OpenGL 2.0+</span> и работающий под Android.
  После чего он был портирован на десктоп и благополучно забыт. Однако в
  2020 году проект был возрожден и был положен в основу курсового
  проекта по ООП.`,
  },
  {
    id: "simulations",
    header: {
      img: "imgs/interests/bg_simulation.jpg",
      title: "Симулятор жизни",
    },
    content: `Одно из новых направлений, которым я решил заняться это нейронные
  сети, генетические алгоритмы и симуляции эволюции. Интересно наблюдать
  как запрограммированная сущность может самостоятельно обучаться и
  изменять свое поведение. Кстати, посмотреть мою первую интерактивную
  симуляцию можно <a href="simple-evolution/index.html">здесь</a>`,
  },
  {
    id: "media",
    header: {
      img: "imgs/interests/bg_media.jpeg",
      title: "Youtube и интернеты",
    },
    content: `Невероятно, но кроме программирования есть и другие вещи моей в жизни.
  Если убрать работу, то свои свободные часы я трачу на деградацию в
  разных соц.сетях. Лидер по отниманию времени -
  <span>Youtube</span>`,
  },
];

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
      extra: interests,
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
  let currentPage = window.location.pathname;

  for (const page of pages) {
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
    const dows = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
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
});
