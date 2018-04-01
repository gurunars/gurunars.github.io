import * as React from "react";

import Carousel from "../Carousel";
import PageWithOverlay from "../PageWithOverlay";

interface ViewConfig<T extends {}> {
  items: T[];
  listView: (
    props: {
      items: T[],
      selectedPostionOnChange: (selectedPosition: number) => void
    }
  ) => React.ReactElement<any>;
  itemView: (props: { item: T }) => React.ReactElement<any>;
}

interface PositionHolder {
  selectedPostion: number | null;
  selectedPostionOnChange: (selectedPosition: number | null) => void;
}

const CollectionView = <T extends {}>(
  props: ViewConfig<T> & PositionHolder
): React.ReactElement<any> => (
    <PageWithOverlay
      backgroundContent={props.listView({
        items: props.items,
        selectedPostionOnChange: props.selectedPostionOnChange
      })}
      foregroundContent={
        props.selectedPostion ? (
          <Carousel
            items={props.items}
            selectedPostion={props.selectedPostion || 0}
            close={() => props.selectedPostionOnChange(null)}
            goTo={pos => props.selectedPostionOnChange}
          >
            {item => props.itemView({ item: item })}
          </Carousel>
        ) : null
      }
    />
  );

export default CollectionView;
