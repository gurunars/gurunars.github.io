import type React from 'react'

import type Box from '../Box'
import Tag from '../Item/Tag'
import ThemeToggle from '../Theme'

import './style.css'

export interface Spec {
  humanReadableName: string
  color: string
}

export interface TypeToSpecMapping {
  [key: string]: Spec
}

export interface GroupSpec<T extends object> {
  humanReadableName: string
  groupBy: (item: T) => NonNullable<unknown>
  sortBy: (item: T) => NonNullable<unknown>
  reverse: boolean
}

export interface TitleToGroupSpecMapping<T extends object> {
  [key: string]: GroupSpec<T>
}

const NamedGroup = (props: { title: string; children: React.ReactNode }): React.ReactElement<any> => (
  <div className="toolbar-group">
    <b className="toolbar-group-title">{props.title}:</b>
    {props.children}
  </div>
)

export interface SpecSelection {
  selectedSpecs: Box<string[]>
}

const SpecFilter = (props: { filterMapping: TypeToSpecMapping } & SpecSelection): React.ReactElement<any> => {
  const specs = props.selectedSpecs.get()
  return (
    <NamedGroup title="Data types">
      <div className="toolbar-options">
        {Object.entries(props.filterMapping).map(([key, value]) => {
          const isSelected = specs.includes(key)
          return (
            <span
              key={key}
              className="pill toolbar-option toolbar-filter"
              data-selected={isSelected}
              // The one value style.css cannot know: this type's own colour.
              style={{ '--type-color': value.color } as React.CSSProperties}
              onClick={() => props.selectedSpecs.set(isSelected ? specs.filter((it) => it !== key) : [...specs, key])}
            >
              {value.humanReadableName}
            </span>
          )
        })}

        <div className="toolbar-actions">
          <span className="toolbar-action" onClick={() => props.selectedSpecs.set([])}>
            Hide All
          </span>

          <span className="toolbar-action" onClick={() => props.selectedSpecs.set(Object.keys(props.filterMapping))}>
            Show All
          </span>
        </div>
      </div>
    </NamedGroup>
  )
}

export interface TagSelection {
  selectedTag: Box<string>
}

export interface TagSpec {
  [key: string]: number
}

const TagFilter = (props: { allTags: TagSpec } & TagSelection): React.ReactElement<any> => (
  <NamedGroup title="Skills">
    <div className="toolbar-tags">
      {Object.entries(props.allTags).map(([title, count]) => (
        <Tag key={title} selected={props.selectedTag.get() === title} onClick={() => props.selectedTag.set(title)}>
          {`${title} (${count})`}
        </Tag>
      ))}
    </div>
  </NamedGroup>
)

export interface GroupSpecSelection {
  selectedGroup: Box<string>
}

const GroupBy = <T extends object>(
  props: { groupMapping: TitleToGroupSpecMapping<T> } & GroupSpecSelection,
): React.ReactElement<any> => (
  <NamedGroup title="Group by">
    <div className="toolbar-options">
      {Object.entries(props.groupMapping).map(([key, value]) => (
        <span
          key={key}
          className="pill toolbar-option toolbar-grouping"
          data-selected={props.selectedGroup.get() === key}
          onClick={() => props.selectedGroup.set(key)}
        >
          {value.humanReadableName}
        </span>
      ))}
    </div>
  </NamedGroup>
)

const Toolbar = <T extends object>(
  props: {
    filterMapping: TypeToSpecMapping
    groupMapping: TitleToGroupSpecMapping<T>
    allTags: TagSpec
  } & SpecSelection &
    GroupSpecSelection &
    TagSelection,
) => (
  <div className="toolbar">
    <GroupBy {...props} />
    <hr className="toolbar-rule" />
    <SpecFilter {...props} />
    <hr className="toolbar-rule" />
    <TagFilter {...props} />
    <hr className="toolbar-rule" />
    <ThemeToggle />
  </div>
)

export default Toolbar
