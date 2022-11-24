'use strict';

window.addEventListener("DOMContentLoaded", () => {
  const tabs = require("./modules/tabs"),
        modal = require("./modules/modal"),
        timer = require("./modules/timer"),
        cards = require("./modules/cards"),
        calc = require("./modules/calculator"),
        slider = require("./modules/slider"),
        form = require("./modules/form");

  tabs();
  modal();
  timer();
  cards();
  calc();
  slider();
  form();

});
