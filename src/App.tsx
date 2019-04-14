import * as _ from "lodash";
import * as React from "react";
import { HashRouter as Router, Redirect, Route } from "react-router-dom";

import HashStateAware from "./HashStateAware";
import { DirectLinkContext } from "./Link";
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
  menuIsVisible: false,
  selectedTag: ALL
};

const App = ({ portfolio }: { portfolio: Portfolio }) => {
  const Shortener = ({ match }: any) => {
    const alias = match.params.alias;
    return <p>SHORTNER {alias}</p>;
  };

  const Index = () => (
    <HashStateAware prefix="/portfolio" initial={initial}>
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
  return (
    <DirectLinkContext.Provider value={false}>
      <Router>
        <Route exact path="/" render={() => <Redirect to="/portfolio" />} />
        <Route path="/sh/:alias" exact strict component={Shortener} />
        <Route path="/portfolio" component={Index} />
      </Router>
    </DirectLinkContext.Provider>
  );
};

export default App;
