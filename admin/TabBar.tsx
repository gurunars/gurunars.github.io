import './tabBar.css'

// A row of mutually exclusive tabs; knows nothing about what they open.
const TabBar = <T extends string>(props: {
  tabs: { key: T; label: string }[]
  active: T
  onSelect: (key: T) => void
}) => (
  <div className="tab-bar">
    {props.tabs.map((tab) => (
      <button
        key={tab.key}
        type="button"
        className="tab-bar-tab"
        data-active={tab.key === props.active}
        onClick={() => props.onSelect(tab.key)}
      >
        {tab.label}
      </button>
    ))}
  </div>
)

export default TabBar
