function cards() {
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

  getResource("http://localhost:3000/menu").then((data) => createCard(data));

  function createCard(data) {
    data.forEach(({ img, altimg, title, descr, price }) => {
      const elem = document.createElement("div");

      elem.classList.add("menu__item");

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
}

module.exports = cards;
