window.addEventListener("DOMContentLoaded", () => {
  // Tabs
  const tabs = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent"),
    tabsParent = document.querySelector(".tabheader__items");

  const hideTabContent = () => {
    tabsContent.forEach((item) => {
      // item.style.display = "none";
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });

    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  };

  const showTabContent = (i = 0) => {
    // tabsContent[i].style.display = "block";
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add("tabheader__item_active");
  };

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener("click", (event) => {
    const target = event.target;

    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  // Timer

  const deadline = "2022-12-30";

  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      hours = Math.floor((t / (1000 * 60 * 60)) % 24),
      minutes = Math.floor((t / 1000 / 60) % 60),
      seconds = Math.floor((t / 1000) % 60);

    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock(".timer", deadline);

  // Modal

  const modalTrigger = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal");
  // modalCloseBtn = document.querySelector("[data-close]");

  modalTrigger.forEach((btn) => {
    btn.addEventListener("click", openModal);
  });

  function closeModal() {
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }

  function openModal() {
    modal.classList.add("show");
    modal.classList.remove("hide");
    // modal.classList.toggle('show');
    document.body.style.overflow = "hidden";
    clearInterval(modalTimerId);
  }

  // modalCloseBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.getAttribute("data-close") == "") {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });

  const modalTimerId = setTimeout(openModal, 50000);

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  }

  window.addEventListener("scroll", showModalByScroll);

  // 048 use classes for cards
  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 27;
      this.changeToTal();
    }

    changeToTal() {
      this.price *= this.transfer;
    }

    render() {
      const element = document.createElement("div");
      //  console.log(this.classes);
      if (this.classes.length === 0) {
        this.element = "menu__item";
        element.classList.add(this.element);
      } else {
        this.classes.forEach((className) => element.classList.add(className));
      }

      element.innerHTML = `
        <img src=${this.src} alt=${this.alt} />
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total"><span>${this.price}</span> тал/день</div>
        </div>
        `;
      this.parent.append(element);
    }
  }

  const getResource = async (url) => {
    const result = await fetch(url);

    if (!result.ok) {
      throw new Error(`Could not fetch ${url}, status ${result.status}`);
    }

    return await result.json();
  };

  // const div = new MenuCard();
  // div.render();

  // getResource("http://localhost:3000/menu").then((data) => {
  //   data.forEach(({ img, altimg, title, descr, price }) => {
  //     new MenuCard(
  //       img,
  //       altimg,
  //       title,
  //       descr,
  //       price,
  //       ".menu .container"
  //     ).render();
  //   });
  // });

  getResource("http://localhost:3000/menu")
   .then(data => createCard(data));

  function createCard(data) {
    data.forEach(({ img, altimg, title, descr, price }) => {
      const elem = document.createElement('div');

      elem.classList.add('menu__item');

      elem.innerHTML = `
        <img src=${img} alt=${altimg} />
        <h3 class="menu__item-subtitle">${title}</h3>
        <div class="menu__item-descr">${descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total"><span>${price}</span> тал/день</div>
        </div>
      `;

      document.querySelector(".menu .container").append(elem); 
    });
  }



  // new MenuCard(
  //   "img/tabs/vegy.jpg",
  //   "vegy",
  //   'Меню "Фитнес"',
  //   ` Меню "Фитнес" - это новый подход к приготовлению блюд: больше
  //   свежих овощей и фруктов. Продукт активных и здоровых людей. Это
  //   абсолютно новый продукт с оптимальной ценой и высоким качеством!`,
  //   9,
  //   ".menu .container",
  //   "menu__item",
  //   "big"
  // ).render();

  // new MenuCard(
  //   "img/tabs/elite.jpg",
  //   "elite",
  //   "Меню “Премиум”",
  //   `В меню “Премиум” мы используем не только красивый дизайн упаковки,
  //   но и качественное исполнение блюд. Красная рыба, морепродукты,
  //   фрукты - ресторанное меню без похода в ресторан!`,
  //   27,
  //   ".menu .container",
  //   "menu__item"
  // ).render();

  // new MenuCard(
  //   "img/tabs/post.jpg",
  //   "post",
  //   'Меню "Постное"',
  //   `Меню “Постное” - это тщательный подбор ингредиентов: полное
  //   отсутствие продуктов животного происхождения, молоко из миндаля,
  //   овса, кокоса или гречки, правильное количество белков за счет тофу
  //   и импортных вегетарианских стейков.`,
  //   13,
  //   ".menu .container",
  //   "menu__item"
  // ).render();

  // Forms

  const forms = document.querySelectorAll("form");

  const message = {
    loading: "img/form/spinner.svg",
    success: "Thank you! Wi will contact you soon!",
    failure: "Something went wrong!",
  };

  forms.forEach((item) => {
    bindPostData(item);
  });

  const postData = async (url, data) => {
    const result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: data,
    });

    return await result.json();
  };

  function bindPostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const statusMessage = document.createElement("img");
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
      `;
      form.insertAdjacentElement("afterend", statusMessage);

      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      // const object = {};
      // formData.forEach((value, key) => {
      //   object[key] = value;
      // });

      // fetch('server.php', {
      //   method: 'POST',
      //   headers: {
      //     'Content-type': 'application/json'
      //   },
      //   body: JSON.stringify(object)
      // })

      postData("http://localhost:3000/requests", json)
        // .then(data => data.text())
        .then((data) => {
          console.log(data);
          showThanksModal(message.success);
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(message.failure);
        })
        .finally(() => {
          form.reset();
        });
    });
  }
  // 054
  function showThanksModal(massage) {
    const prevModalDialog = document.querySelector(".modal__dialog");

    prevModalDialog.classList.add("hide");
    openModal();

    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
      <div class="modal__content">
        <div data-close class="modal__close">×</div>
        <div class="modal__title">${massage}</div>
      </div>
    `;

    document.querySelector(".modal").append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      closeModal();
    }, 4000);
  }

  // 058

  // fetch("http://localhost:3000/menu").then((data) => data.json());
  // .then(result => console.log(result));

  //061 Slider

  const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width;

  let slideIndex = 1;
  let offset = 0;

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
  }

   slidesField.style.width = 100 * slides.length + "%";
   slidesField.style.display = 'flex';
   slidesField.style.transition = '0.5s all';

   slidesWrapper.style.overflow = 'hidden';


  slides.forEach(slide => {
    slide.style.width = width;
  });

  slider.style.position ='relative';

  const indicators = document.createElement('ol'),
        dots = [];
  indicators.classList.add('carousel-indicators');
  indicators.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
  `;
  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.style.cssText = `
      box-sizing: content-box;
      flex: 0 1 auto;
      width: 30px;
      height: 6px;
      margin-right: 3px;
      margin-left: 3px;
      cursor: pointer;
      background-color: #fff;
      background-clip: padding-box;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      opacity: .5;
      transition: opacity .6s ease;
    `;
    if (i == 0) {
      dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
  }
  
  function dotsOpacity(arr, i) {
    arr.forEach(d => d.style.opacity = '.5');
    arr[i - 1].style.opacity = '1';
  }

  function addZero(arr, cur, i) {
    if (arr.length < 10) {
      cur.textContent =  `0${i}`;
    } else {
      cur.textContent = i;
    }
  }

  function onlyDigits(str) {
    return +str.replace(/\D/g, "");
  }


  next.addEventListener('click', () => {
    // if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
    if (offset == onlyDigits(width) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += onlyDigits(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    // if (slides.length < 10) {
    //   current.textContent = `0${slideIndex}`;
    // } else {
    //   current.textContent = slideIndex;
    // }
    addZero(slides, current, slideIndex);

    dotsOpacity(dots, slideIndex);
    // dots.forEach(dot => dot.style.opacity = '.5');
    // dots[slideIndex - 1].style.opacity = '1';
  });

 

  prev.addEventListener('click', () => {
    if (offset == 0 ) {
      offset = onlyDigits(width)* (slides.length - 1);
    } else {
      offset -= onlyDigits(width);
    }


    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    // if (slides.length < 10) {
    //   current.textContent = `0${slideIndex}`;
    // } else {
    //   current.textContent = slideIndex;
    // }

    addZero(slides, current, slideIndex);

    dotsOpacity(dots, slideIndex);
    // dots.forEach(dot => dot.style.opacity = '.5');
    // dots[slideIndex - 1].style.opacity = '1';
  });

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const slideTo = e.target.getAttribute('data-slide-to');

      slideIndex = slideTo;
      offset = onlyDigits(width) * (slideTo - 1);

      slidesField.style.transform = `translateX(-${offset}px)`;

      // if (slides.length < 10) {
      //   current.textContent = `0${slideIndex}`;
      // } else {
      //   current.textContent = slideIndex;
      // }

      addZero(slides, current, slideIndex);



      dotsOpacity(dots, slideIndex);
      // dots.forEach(dot => dot.style.opacity = '.5');
      // dots[slideIndex - 1].style.opacity = '1';

    });
  });

    

  // showSlides(slideIndex); 

  // if (slides.length < 10) {
  //   total.textContent = `0${slides.length}`;
  // } else {
  //   total.textContent = slides.length;
  // }

  // function showSlides(n) {
  //   if (n > slides.length) {
  //     slideIndex = 1;
  //   }

  //   if (n < 1) {
  //     slideIndex = slides.length;
  //   }

  //   slides.forEach(item => item.style.display = 'none');

  //   slides[slideIndex - 1].style.display = 'block';

  //  if (slides.length < 10) {
  //     current.textContent = `0${slideIndex}`;
  //   } else {
  //     current.textContent = slideIndex;
  //   }
  // }

  // function plusSlides(n) {
  //   showSlides(slideIndex += n);
  // }

  // prev.addEventListener('click', () => {
  //   plusSlides(-1);
  // });

  // next.addEventListener('click', () => {
  //   plusSlides(1);
  // });

  // 062 slider2

});
