'use strict';

import tabs from "./modules/tabs";
import modal from "./modules/modal";
import timer from "./modules/timer";
import cards from "./modules/cards";
import calc from "./modules/calculator";
import slider from "./modules/slider";
import form from "./modules/form";
import {openModal} from "./modules/modal";

window.addEventListener("DOMContentLoaded", () => {

  const modalTimerId = setTimeout(() => openModal(".modal", modalTimerId), 500000);


  // const tabs = require("./modules/tabs"),
  //       modal = require("./modules/modal"),
  //       timer = require("./modules/timer"),
  //       cards = require("./modules/cards"),
  //       calc = require("./modules/calculator"),
  //       slider = require("./modules/slider"),
  //       form = require("./modules/form");

  tabs(".tabheader__item", ".tabcontent", ".tabheader__items", "tabheader__item_active");
  modal("[data-modal]", ".modal", modalTimerId);
  timer(".timer", "2023-01-01");
  cards();
  calc();
  slider({
    container: ".offer__slider",
    nextArrow: ".offer__slider-next",
    prevArrow: ".offer__slider-prev",
    slide: ".offer__slide",
    totalCounter: "#total",
    currentCounter: "#current",
    wrapper: ".offer__slider-wrapper",
    field: ".offer__slider-inner",
  });
  form("form", modalTimerId);

});
