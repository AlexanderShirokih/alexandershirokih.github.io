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
