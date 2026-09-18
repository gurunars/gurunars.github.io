import _ from 'lodash'
import type React from 'react'
import type Box from '../Box'
import Carousel from '../Carousel'
import GroupedList from '../GroupedList'
import { groupItems } from '../GroupedList/grouping'
import { getId, type Item, Large, Small } from '../Item'
import { getImportantSkills, type Portfolio } from '../model'
import PageWithOverlay from '../PageWithOverlay'
import PageWithSideMenu, { type MenuVisibility } from '../PageWithSideMenu'
import responsive from '../Responsive'
import BaseToolbar, {
  type GroupSpecSelection,
  type SpecSelection,
  type TagSelection,
  type TagSpec,
  type TitleToGroupSpecMapping,
  type TypeToSpecMapping,
} from '../Toolbar'
import { yearToString } from '../utils'

export const typeToSpecMapping: TypeToSpecMapping = {
  contactCard: {
    // NOTE: contact card is first anyways - we are all good
    humanReadableName: '@ Contact Card',
    color: 'PaleTurquoise',
  },
  openSource: {
    humanReadableName: 'Open Source',
    color: 'PaleGreen',
  },
  freelance: {
    humanReadableName: 'Freelance',
    color: 'MistyRose',
  },
  fullTimeJob: {
    humanReadableName: 'Full Time Job',
    color: 'Lavender',
  },
  publication: {
    humanReadableName: 'Publication',
    color: 'Gainsboro',
  },
  education: {
    humanReadableName: 'Education',
    color: 'Thistle',
  },
  certificate: {
    humanReadableName: 'Certificate',
    color: 'Khaki',
  },
}

export const groups: TitleToGroupSpecMapping<Item> = {
  type: {
    humanReadableName: 'Type',
    groupBy: (item: Item) => typeToSpecMapping[item.type].humanReadableName,
    sortBy: (item: Item) => -item.duration.start.getTime(),
    reverse: false,
  },
  endYear: {
    humanReadableName: 'End Year',
    groupBy: (item: Item) => yearToString(item.duration.end),
    sortBy: (item: Item) => item.duration.end,
    reverse: true,
  },
  startYear: {
    humanReadableName: 'Start Year',
    groupBy: (item: Item) => yearToString(item.duration.start),
    sortBy: (item: Item) => item.duration.start,
    reverse: true,
  },
  title: {
    humanReadableName: 'Title',
    groupBy: (item: Item) => item.title[0].toUpperCase(),
    sortBy: (item: Item) => item.title,
    reverse: false,
  },
  location: {
    humanReadableName: 'Location',
    groupBy: (item: Item) => item.location.name,
    sortBy: (item: Item) => item.location.name,
    reverse: false,
  },
}

const filterItems = (items: Item[], types: string[]): Item[] =>
  _.filter(items, (item) => types.indexOf(item.type) !== -1)

const filterByTag = (items: Item[], tag: string): Item[] => _.filter(items, (item: Item) => item.tags.indexOf(tag) > -1)

const Toolbar = (props: { allTags: TagSpec } & SpecSelection & GroupSpecSelection & TagSelection) => (
  <BaseToolbar groupMapping={groups} filterMapping={typeToSpecMapping} {...props} />
)

interface IdHolder {
  selectedId: Box<number | null>
}

const DesktopToolbarWrapper = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      width: '270px',
      overflowY: 'auto',
      borderRight: '1px solid var(--border)',
      height: '100%',
      backgroundColor: 'var(--bg)',
    }}
  >
    {children}
  </div>
)

const MobileToolbarWrapper = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      backgroundColor: 'var(--surface)',
      minHeight: '100%',
    }}
  >
    {children}
  </div>
)

const ToolbarWrapper = responsive({
  desktopView: DesktopToolbarWrapper,
  mobileView: MobileToolbarWrapper,
})

const Main = (
  props: {
    children?: React.JSX.Element
    portfolio: Portfolio
  } & IdHolder &
    SpecSelection &
    GroupSpecSelection &
    MenuVisibility &
    TagSelection,
) => {
  const group = groups[props.selectedGroup.get()]

  const filtered = filterByTag(filterItems(props.portfolio.items, props.selectedSpecs.get()), props.selectedTag.get())

  const grouped = groupItems(filtered, group.groupBy, group.sortBy, group.reverse)
  const flattened = _.flatMap(grouped, (grp) => grp.elements)
  const selectedPosition = _.findIndex(flattened, (item) => props.selectedId.get() === getId(item))
  return (
    <PageWithOverlay
      foregroundContent={
        selectedPosition > -1 ? (
          <Carousel
            size={flattened.length}
            selectedPosition={selectedPosition || 0}
            close={() => props.selectedId.set(null)}
            goTo={(pos) => props.selectedId.set(getId(flattened[pos]))}
          >
            {(pos) => <Large item={flattened[pos]} />}
          </Carousel>
        ) : null
      }
    >
      <PageWithSideMenu
        menu={
          <ToolbarWrapper>
            <Toolbar allTags={getImportantSkills(props.portfolio)} {...props} />
          </ToolbarWrapper>
        }
        {...props}
      >
        <GroupedList
          items={grouped}
          renderItem={({ item }: { item: Item }) => (
            <Small
              style={
                {
                  '--type-color': typeToSpecMapping[item.type].color,
                } as React.CSSProperties
              }
              item={item}
              onClick={() => props.selectedId.set(getId(item))}
            />
          )}
        />
      </PageWithSideMenu>
    </PageWithOverlay>
  )
}

export default Main
