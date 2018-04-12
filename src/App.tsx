import * as React from "react";

import Site from "./Site";
import HashStateAware from "./HashStateAware";
import { merge } from "./utils";

interface State {
  selectedId: number | null;
  selectedSpecs: string[] | null;
  selectedGroup: string | null;
  menuIsVisible: boolean;
  isToolbarOpen: boolean;
}

const initial: State = {
  selectedId: null,
  selectedSpecs: null,
  selectedGroup: null,
  menuIsVisible: true,
  isToolbarOpen: false
};

const App = ({ portfolio }: { portfolio: any }) => (
  <HashStateAware initial={initial}>
    {(data: State, set: (data: State) => void) => {

      const mutate = (name: string, value: any) => {
        const payload = {};
        payload[name] = value;
        set(merge(data, payload) as State);
      };

      const bind = (name: string) => mutate.bind(null, name);

      return (
        <Site
          portfolio={portfolio}
          {...data}
          isToolbarOpenOnChange={bind("isToolbarOpen")}
          selectedIdOnChange={bind("selectedId")}
          selectedSpecsOnChange={bind("selectedSpecs")}
          selectedGroupOnChange={bind("selectedGroup")}
          menuIsVisibleOnChange={bind("menuIsVisible")}
        />);
    }}
  </HashStateAware>
);

export default App;
