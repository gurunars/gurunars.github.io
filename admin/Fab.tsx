import './fab.css'

// A floating "+" action button; what it adds is the caller's business.
const Fab = (props: { title: string; onClick: () => void }) => (
  <button type="button" className="fab" title={props.title} onClick={props.onClick}>
    +
  </button>
)

export default Fab
