import * as React from "react";
import * as _ from "lodash";

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

export interface PositionHolder {
  selectedPosition: number | null;
  selectedPositionOnChange: (selectedPosition: number | null) => void;
}

const CollectionView = <T extends {}>(
  props: ViewConfig<T> & PositionHolder
): React.ReactElement<any> => (
    <PageWithOverlay
      backgroundContent={props.listView({
        items: props.items,
        selectedPostionOnChange: props.selectedPositionOnChange
      })}
      foregroundContent={
        !_.isNil(props.selectedPosition) ? (
          <Carousel
            size={props.items.length}
            selectedPostion={props.selectedPosition || 0}
            close={() => props.selectedPositionOnChange(null)}
            goTo={pos => props.selectedPositionOnChange(pos)}
          >
            {pos => props.itemView({item: props.items[pos]})}
          </Carousel>
        ) : null
      }
    />
  );

export default CollectionView;
