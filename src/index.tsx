import jsyaml from 'js-yaml'
import { render } from 'react-dom'

import App from './App'
import preprocess from './model'
import SizeAware from './SizeAware'

const SITE_URL = '/portfolio.yaml'

const root = document.getElementById('root') as HTMLElement

fetch(SITE_URL)
  .then(async item => item.text())
  .then(text =>
    render(
      <SizeAware>
        <App portfolio={preprocess(jsyaml.load(text))} />
      </SizeAware>,
      root
    ),
  )
