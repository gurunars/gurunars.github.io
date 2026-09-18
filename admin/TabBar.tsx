// A row of mutually exclusive tabs; knows nothing about what they open.
const TabBar = <T extends string>(props: {
  tabs: { key: T; label: string }[]
  active: T
  onSelect: (key: T) => void
}) => (
  <div style={{ display: 'flex', gap: 4 }}>
    {props.tabs.map((tab) => {
      const active = tab.key === props.active
      return (
        <button
          key={tab.key}
          type="button"
          onClick={() => props.onSelect(tab.key)}
          style={{
            padding: '6px 18px',
            cursor: 'pointer',
            border: '1px solid #1b2e3c',
            borderBottom: 'none',
            borderRadius: '5px 5px 0 0',
            backgroundColor: active ? '#1b2e3c' : 'white',
            color: active ? 'white' : '#1b2e3c',
            fontWeight: active ? 'bold' : 'normal',
          }}
        >
          {tab.label}
        </button>
      )
    })}
  </div>
)

export default TabBar
