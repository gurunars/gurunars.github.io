import * as React from "react";
import * as ReactDOM from "react-dom";
import jsyaml from "js-yaml";

import App from "./App";

const SITE_URL = "https://gurunars.github.io/personal.portfolio/portfolio.yaml";

fetch(SITE_URL).then(item => item.text()).then(text => {
  ReactDOM.render(
    <App portfolio={jsyaml.load(text)} />,
    document.getElementById("root") as HTMLElement
  );
});
