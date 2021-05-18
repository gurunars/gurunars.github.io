const Centralized = ({ children }: { children: any }) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      minHeight: '600px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    {children}
  </div>
)

export default Centralized
