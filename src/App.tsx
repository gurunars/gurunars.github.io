import * as _ from "lodash";
import * as React from "react";

import HashStateAware from "./HashStateAware";
import { ALL, Portfolio } from "./model";
import Site, { groups, typeToSpecMapping } from "./Site";
import { merge } from "./utils";

interface State {
  selectedId: number | null;
  selectedSpecs: string[];
  selectedGroup: string;
  menuIsVisible: boolean;
  selectedTag: string;
}

const initial = {
  selectedId: null,
  selectedSpecs: _.keys(typeToSpecMapping),
  selectedGroup: _.keys(groups)[0],
  menuIsVisible: true,
  selectedTag: ALL
};

const App = ({ portfolio }: { portfolio: Portfolio }) => (
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
          selectedId={field("selectedId")}
          selectedTag={field("selectedTag")}
          menuIsVisible={field("menuIsVisible")}
        />
      );
    }}
  </HashStateAware>
);

export default App;
