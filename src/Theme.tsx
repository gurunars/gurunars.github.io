import { useEffect, useState } from 'react'

import './themeToggle.css'

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

  const Option = ({ value }: { value: Theme }) => (
    <span className="theme-toggle-option" data-active={theme === value} onClick={() => setTheme(value)}>
      {value.toUpperCase()}
    </span>
  )

  return (
    <div className="theme-toggle">
      <span
        className="pill theme-toggle-switch"
        title="Toggle theme"
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      >
        <span className="theme-toggle-glyph" data-active={theme === 'light'}>
          ☀
        </span>
        <span className="theme-toggle-glyph" data-active={theme === 'dark'}>
          ☾
        </span>
      </span>
      <b className="theme-toggle-label">THEME:</b>
      <Option value="light" />
      <span className="theme-toggle-label">|</span>
      <Option value="dark" />
    </div>
  )
}

export default ThemeToggle
