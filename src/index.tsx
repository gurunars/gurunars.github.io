import jsyaml from 'js-yaml'
import ReactDOM from 'react-dom'

import App from './App'
import preprocess from './model'
import SizeAware from './SizeAware'

const SITE_URL = '/portfolio.yaml'

fetch(SITE_URL)
  .then(async item => item.text())
  .then(text =>
    ReactDOM.render(
      <SizeAware>
        <App portfolio={preprocess(jsyaml.load(text))} />
      </SizeAware>,
      document.getElementById('root') as HTMLElement,
    ),
  )
