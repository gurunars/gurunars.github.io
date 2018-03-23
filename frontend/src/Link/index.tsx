import * as React from "react";

import jsonpack from "jsonpack";

import HashAware from "../HashAware";

const deserialize = (location: string): Object => {
  try {
    return jsonpack.unpack(location.replace("#", ""));
  } catch {
    return {};
  }
}

const serialize = (params: Object): string =>
  "#" + jsonpack.pack(params);

const intersect = (biggerObject: any, smallerObject: any): boolean => {
  // Checks if the smallerObject is fully contained inside the bigger one

  if (!biggerObject) {
    return false;
  }

  for (const key in Object.keys(smallerObject)) {
    if (smallerObject[key] !== biggerObject[key]) {
      return false;
    }
  }

  return true;
};

const Link = (props: {
  children: (isActive: boolean) => React.ReactElement<any>,
  params: Object
}): React.ReactElement<any> => (
    <HashAware>
      {hash => {
        const params = props.params;
        const originalParams = deserialize(hash);
        const isActive = intersect(originalParams, params);
        const newParams = Object.assign({}, originalParams, params);
        return <a href={serialize(newParams)}>{props.children(isActive)}</a>;
      }}
    </HashAware>
  );

export default Link;