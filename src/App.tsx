import * as _ from "lodash";
import * as React from "react";

import HashStateAware from "./HashStateAware";
import Site, { Groups, TypeToSpecMapping } from "./Site";
import { merge } from "./utils";

interface State {
  selectedId: number | null;
  selectedSpecs: string[];
  selectedGroup: string;
  menuIsVisible: boolean;
  isToolbarOpen: boolean;
  selectedTags: string[] | "ALL";
}

const initial: State = {
  selectedId: null,
  selectedSpecs: _.keys(TypeToSpecMapping),
  selectedGroup: _.keys(Groups)[0],
  menuIsVisible: true,
  isToolbarOpen: false,
  selectedTags: "ALL"
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
          selectedTags={field("selectedTags")}
          menuIsVisible={field("menuIsVisible")}
        />
      );
    }}
  </HashStateAware>
);

export default App;
