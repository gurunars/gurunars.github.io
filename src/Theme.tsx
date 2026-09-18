import { useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

const readTheme = (): Theme => {
  const stored = localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark') {
    return stored
  }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>(readTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  const flip = () => setTheme(theme === 'light' ? 'dark' : 'light')

  const Option = ({ value }: { value: Theme }) => (
    <span
      onClick={() => setTheme(value)}
      style={{
        cursor: 'pointer',
        fontWeight: theme === value ? 'bold' : 'normal',
        color: theme === value ? 'var(--link)' : 'var(--muted)',
      }}
    >
      {value.toUpperCase()}
    </span>
  )

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: 8,
        fontSize: 12,
      }}
    >
      <span
        className="pill"
        onClick={flip}
        title="Toggle theme"
        style={{
          padding: '4px 12px',
          display: 'inline-flex',
          gap: 10,
          cursor: 'pointer',
          fontSize: 14,
        }}
      >
        <span style={{ opacity: theme === 'light' ? 1 : 0.35 }}>☀</span>
        <span style={{ opacity: theme === 'dark' ? 1 : 0.35 }}>☾</span>
      </span>
      <b style={{ color: 'var(--muted)' }}>THEME:</b>
      <Option value="light" />
      <span style={{ color: 'var(--muted)' }}>|</span>
      <Option value="dark" />
    </div>
  )
}

export default ThemeToggle
