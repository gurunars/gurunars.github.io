import { load } from 'js-yaml'
import { createRoot } from 'react-dom/client'

import './theme.css'

import App from './App'
import preprocess from './model'
import SizeAware from './SizeAware'

const SITE_URL = '/portfolio.yaml'

const root = document.getElementById('root') as HTMLElement

fetch(SITE_URL)
  .then(async (item) => item.text())
  .then((text) =>
    createRoot(root).render(
      <SizeAware>
        <App portfolio={preprocess(load(text))} />
      </SizeAware>,
    ),
  )
