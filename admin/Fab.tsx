// A floating "+" action button; what it adds is the caller's business.
const Fab = (props: { title: string; onClick: () => void }) => (
  <button
    type="button"
    title={props.title}
    onClick={props.onClick}
    style={{
      position: 'fixed',
      bottom: 24,
      right: 24,
      width: 56,
      height: 56,
      borderRadius: '50%',
      border: 'none',
      backgroundColor: '#1b6e1b',
      color: 'white',
      fontSize: 30,
      lineHeight: '56px',
      cursor: 'pointer',
      boxShadow: '0 3px 8px rgba(0,0,0,0.35)',
      zIndex: 10,
    }}
  >
    +
  </button>
)

export default Fab
