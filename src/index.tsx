import * as React from "react";
import * as ReactDOM from "react-dom";
import jsyaml from "js-yaml";

import App from "./App";
import preprocess from "./model";

const SITE_URL = "https://gurunars.github.io/personal.portfolio/portfolio.yaml";

fetch(SITE_URL)
  .then(async item => item.text())
  .then(text =>
    ReactDOM.render(
      <App portfolio={preprocess(jsyaml.load(text))} />,
      document.getElementById("root") as HTMLElement
    )
  );
