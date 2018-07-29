import * as React from "react";

import HashStateAware from "./HashStateAware";
import Site from "./Site";
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
      const field = (name: string) => ({
        get: () => data[name],
        set: (value: any) => {
          const payload = {};
          payload[name] = value;
          set(merge(data, payload) as State);
        }
      });

      return (
        <Site
          portfolio={portfolio}
          selectedSpecs={field("selectedSpecs")}
          selectedGroup={field("selectedGroup")}
          isToolbarOpen={field("isToolbarOpen")}
          selectedId={field("selectedId")}
          menuIsVisible={field("menuIsVisible")}
        />
      );
    }}
  </HashStateAware>
);

export default App;
