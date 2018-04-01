import * as React from "react";
import { storiesOf } from "@storybook/react";
import { host } from "storybook-host";
import { withState, withProps, compose } from "recompose";

import PlainCollectionView from ".";

interface Item {
  title: string;
}

const first: Item = {
  title: "Item one"
};

const items: Item[] = [
  {
    title: "Item zero"
  },
  first,
  {
    title: "Item two"
  }
];

const ListView = (props: {
  items: Item[],
  selectedPostionOnChange: (selectedPosition: number) => void
}) => (
    <div>
      {props.items.map((cursor, index) => (
        <p
          key={index}
          style={{
            cursor: "pointer",
            padding: "5px"
          }}
          onClick={() => {
            console.log(index);
            props.selectedPostionOnChange(index);
          }}
        >{cursor.title}
        </p>
      ))}
    </div>
  );

const ItemView = (props: { item: Item }) => <h1>{props.item.title}</h1>;

const CollectionView = compose(
  withProps({
    items: items,
    listView: ListView,
    itemView: ItemView
  }),
  withState("selectedPosition", "selectedPositionOnChange", null)
)(PlainCollectionView);

storiesOf("CollectionView", module)
  .addDecorator(host({
    align: "center bottom",
    height: 600,
    width: 800,
  }))
  .add("basic", () => (
    <CollectionView />
  ));