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

const Link = (props: {
  children: (isActive: boolean) => React.ReactElement<any>,
  params: Object
}): React.ReactElement<any> => (
    <HashAware>
      {hash => {
        const params = props.params;
        const originalParams = deserialize(hash);
        const isActive = _.some(originalParams, params);
        const newParams = _.merge({}, originalParams, params);
        return <a href={serialize(newParams)}>{props.children(isActive)}</a>;
      }}
    </HashAware>
  );

export default Link;