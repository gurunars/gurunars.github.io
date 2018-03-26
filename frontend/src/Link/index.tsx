import * as React from "react";
import * as _ from "lodash";

import jsonpack from "jsonpack";

import HashAware from "../HashAware";

const deserialize = (location: string): Object => {
  try {
    return jsonpack.unpack(location.replace("#", ""));
  } catch {
    return {};
  }
};

const serialize = (params: Object): string =>
  "#" + jsonpack.pack(params);

type LinkSupplier = (isActive: boolean) => React.ReactElement<any>;

const Link = (props: {
  children: LinkSupplier | React.ReactElement<any>,
  params: Object
}): React.ReactElement<any> => (
    <HashAware>
      {hash => {
        const params = props.params;
        const originalParams = deserialize(hash);
        const isActive = _.some([originalParams], params);
        const newParams = _.merge({}, originalParams, params);

        let payload: React.ReactElement<any>;
        if (typeof props.children === "function") {
          payload = props.children(isActive);
        } else {
          payload = props.children;
        }

        return <a href={serialize(newParams)}>{payload}</a>;
      }}
    </HashAware>
  );

export default Link;