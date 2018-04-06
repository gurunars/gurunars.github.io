
const fallback = require("./link.svg");

const minimize = require("./minimize.svg");
const maximize = require("./maximize.svg")

const icons = {
  minimize: minimize,
  maximize: maximize
};

const getIconForType = (type?: string) =>
  icons[type || "link"] || fallback;

export default getIconForType;
