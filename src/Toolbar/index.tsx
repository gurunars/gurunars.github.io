import _ from 'lodash'
import type React from 'react'

import type Box from '../Box'
import Tag from '../Item/Tag'
import ThemeToggle from '../Theme'
import { merge } from '../utils'

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

const baseStyle = {
  cursor: 'pointer',
  marginBottom: 5,
  textAlign: 'center',
  paddingTop: 6,
  paddingBottom: 6,
}

const NamedGroup = (props: { title: string; children: React.JSX.Element }): React.ReactElement<any> => (
  <div
    style={{
      flexDirection: 'column',
      display: 'flex',
      padding: 8,
    }}
  >
    <b
      style={{
        marginBottom: 8,
        whiteSpace: 'nowrap',
      }}
    >
      {props.title}:
    </b>
    {props.children}
  </div>
)

export interface SpecSelection {
  selectedSpecs: Box<string[]>
}

const ACTION_STYLE = {
  color: 'var(--link)',
  cursor: 'pointer',
  fontSize: 12,
  paddingTop: 10,
}

const SpecFilter = (props: { filterMapping: TypeToSpecMapping } & SpecSelection): React.ReactElement<any> => (
  <NamedGroup title="Data types">
    <div
      style={{
        width: '100%',
        flexDirection: 'column',
        display: 'flex',
      }}
    >
      {_.map(props.filterMapping, (value, key) => {
        const specs = props.selectedSpecs.get()
        const isSelected = specs.indexOf(key) > -1
        return (
          <span
            key={key}
            className="pill"
            style={merge(baseStyle, {
              '--type-color': value.color,
              textDecoration: isSelected ? 'none' : 'line-through',
              opacity: isSelected ? 1 : 0.55,
            })}
            onClick={() => props.selectedSpecs.set(isSelected ? specs.filter((it) => it !== key) : [...specs, key])}
          >
            {value.humanReadableName}
          </span>
        )
      })}

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <span onClick={() => props.selectedSpecs.set([])} style={ACTION_STYLE}>
          Hide All
        </span>

        <span onClick={() => props.selectedSpecs.set(_.keys(props.filterMapping))} style={ACTION_STYLE}>
          Show All
        </span>
      </div>
    </div>
  </NamedGroup>
)

export interface TagSelection {
  selectedTag: Box<string>
}

export interface TagSpec {
  [key: string]: number
}

const TagFilter = (props: { allTags: TagSpec } & TagSelection): React.ReactElement<any> => (
  <NamedGroup title="Skills">
    <div>
      {_.map(props.allTags, (count, title) => {
        const isSelected = props.selectedTag.get() === title
        return (
          <Tag
            key={title}
            style={{
              marginBottom: '5px',
              cursor: 'pointer',
              color: isSelected ? 'var(--link)' : 'var(--chip-text)',
              borderColor: isSelected ? 'var(--link)' : 'var(--chip-border)',
              fontWeight: isSelected ? 'bold' : 'normal',
            }}
            onClick={() => props.selectedTag.set(title)}
          >
            {`${title} (${count})`}
          </Tag>
        )
      })}
    </div>
  </NamedGroup>
)

export interface GroupSpecSelection {
  selectedGroup: Box<string>
}

const Sep = () => (
  <div
    style={{
      width: '100%',
      backgroundColor: 'var(--border)',
      height: 1,
    }}
  />
)

const GroupBy = <T extends object>(
  props: { groupMapping: TitleToGroupSpecMapping<T> } & GroupSpecSelection,
): React.ReactElement<any> => (
  <NamedGroup title="Group by">
    <div
      style={{
        width: '100%',
        flexDirection: 'column',
        display: 'flex',
      }}
    >
      {_.map(props.groupMapping, (value, key) => {
        const isSelected = props.selectedGroup.get() === key
        return (
          <span
            key={key}
            className="pill"
            style={merge(baseStyle, {
              backgroundColor: isSelected ? 'var(--accent)' : undefined,
              borderColor: isSelected ? 'transparent' : undefined,
              marginBottom: 5,
              color: isSelected ? 'var(--accent-text)' : undefined,
            })}
            onClick={() => props.selectedGroup.set(key)}
          >
            {value.humanReadableName}
          </span>
        )
      })}
    </div>
  </NamedGroup>
)

const Toolbar = <T extends object>(
  props: {
    children?: React.ReactElement<any>
    filterMapping: TypeToSpecMapping
    groupMapping: TitleToGroupSpecMapping<T>
    allTags: TagSpec
  } & SpecSelection &
    GroupSpecSelection &
    TagSelection,
) => (
  <div
    style={{
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: '100%',
    }}
  >
    <GroupBy {...props} />
    <Sep />
    <SpecFilter {...props} />
    <Sep />
    <TagFilter {...props} />
    <Sep />
    <ThemeToggle />
  </div>
)

export default Toolbar
