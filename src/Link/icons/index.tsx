
const fallback = require("./link.svg");

const skype = require("./skype.svg");
const pdf = require("./pdf.svg");
const phone = require("./phone.svg");
const email = require("./email.svg");
const docs = require("./docs.svg");
const cv = require("./cv.svg");
const linkedin = require("./linkedin.svg");
const stackoverflow = require("./stackoverflow.svg");
const amazon = require("./amazon.svg");
const play = require("./play.svg");
const link = require("./link.svg");
const github = require("./github.svg");
const print = require("./print.svg");

const icons = {
  skype: skype,
  pdf: pdf,
  phone: phone,
  email: email,
  docs: docs,
  cv: cv,
  linkedin: linkedin,
  stackoverflow: stackoverflow,
  amazon: amazon,
  play: play,
  link: link,
  github: github,
  print: print
};

export default (type?: string) =>
  icons[type || "link"] || fallback;
