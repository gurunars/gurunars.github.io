import * as React from "react";

import { Large } from "../Item";
import { Portfolio } from "../model";

const Cv = (props: { portfolio: Portfolio }): React.ReactElement<any> => (
  <div
    style={{
      width: "100%",
      height: "100%"
    }}
  >
    {props.portfolio.items.map(it => (
      <Large item={it} />
    ))}
  </div>
);

export default Cv;
