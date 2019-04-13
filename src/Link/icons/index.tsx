import amazon from "./amazon.svg";
import coursera from "./coursera.svg";
import cv from "./cv.svg";
import docs from "./docs.svg";
import email from "./email.svg";
import github from "./github.svg";
import link from "./link.svg";
import linkedin from "./linkedin.svg";
import pdf from "./pdf.svg";
import phone from "./phone.svg";
import play from "./play.svg";
import print from "./print.svg";
import skype from "./skype.svg";
import stackoverflow from "./stackoverflow.svg";

const icons = {
  amazon,
  coursera,
  cv,
  docs,
  email,
  github,
  link,
  linkedin,
  pdf,
  phone,
  play,
  print,
  skype,
  stackoverflow
};

const getIconForType = (type?: string) => icons[type || "link"] || link;

export default getIconForType;
