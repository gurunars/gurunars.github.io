import jsyaml from 'js-yaml'
import { createRoot } from 'react-dom/client'

import App from './App'
import preprocess from './model'
import SizeAware from './SizeAware'

const SITE_URL = '/portfolio.yaml'

const root = createRoot(document.getElementById('root') as HTMLElement)

fetch(SITE_URL)
  .then(async item => item.text())
  .then(text =>
    root.render(
      <SizeAware>
        <App portfolio={preprocess(jsyaml.load(text))} />
      </SizeAware>,
    ),
  )
