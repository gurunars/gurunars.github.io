import _ from 'lodash'
import { HashRouter as Router, Redirect, Route } from 'react-router-dom'

import Cv from './Cv'
import HashStateAware from './HashStateAware'
import { DirectLinkContext, LinkPreview } from './Link'
import { ALL, Portfolio } from './model'
import Site, { groups, typeToSpecMapping } from './Site'
import { merge } from './utils'

interface State {
  selectedId: number | null;
  selectedSpecs: string[];
  selectedGroup: string;
  menuIsVisible: boolean;
  selectedTag: string;
}

const initial = {
  selectedId: null,
  selectedSpecs: _.keys(typeToSpecMapping),
  selectedGroup: _.keys(groups)[0],
  menuIsVisible: false,
  selectedTag: ALL,
}

const App = ({ portfolio }: { portfolio: Portfolio }) => {
  const mapping = {}

  portfolio.links.forEach(it => {
    mapping[it.alias] = it
  })

  const Shortener = ({ match }: any) => (
    <LinkPreview links={mapping} alias={match.params.alias} />
  )

  const CvView = () => (
    <DirectLinkContext.Provider value={false}>
      <Cv portfolio={portfolio} />
    </DirectLinkContext.Provider>
  )

  const Index = () => (
    <HashStateAware prefix="/portfolio" initial={initial}>
      {(data: State, set: (innerData: State) => void) => {
        const field = (name: string) => ({
          get: () => data[name],
          set: (value: any) => {
            const payload = {}
            payload[name] = value
            set(merge(data, payload) as State)
          },
        })

        return (
          <Site
            portfolio={portfolio}
            selectedSpecs={field('selectedSpecs')}
            selectedGroup={field('selectedGroup')}
            selectedId={field('selectedId')}
            selectedTag={field('selectedTag')}
            menuIsVisible={field('menuIsVisible')}
          />
        )
      }}
    </HashStateAware>
  )
  return (
    <Router>
      <Route exact path="/" render={() => <Redirect to="/portfolio" />} />
      <Route path="/sh/:alias" exact strict component={Shortener} />
      <Route path="/portfolio" component={Index} />
      <Route path="/cv" component={CvView} />
    </Router>
  )
}

export default App
