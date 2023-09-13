import _ from 'lodash'
import { HashRouter as Router, Redirect, Route } from 'react-router-dom'

import Cv from './Cv'
import HashStateAware from './HashStateAware'
import { DirectLinkContext, LinkPreview } from './Link'
import { ALL, Portfolio } from './model'
import Site, { groups, typeToSpecMapping } from './Site'
import { fieldBox, box } from './Box'
import { Link } from './Link'

interface State {
  selectedId: number | null;
  selectedSpecs: string[];
  selectedGroup: string;
  menuIsVisible: boolean;
  selectedTag: string;
}

const initial: State = {
  selectedId: null,
  selectedSpecs: _.keys(typeToSpecMapping),
  selectedGroup: _.keys(groups)[0],
  menuIsVisible: false,
  selectedTag: ALL,
}

const App = ({ portfolio }: { portfolio: Portfolio }) => {
  const mapping: Record<string, Link> = {}

  portfolio.links.forEach(it => {
    mapping[it.alias] = it
  })

  const Shortener = ({ match }: { match: { params: { alias: string } } }) => (
    <LinkPreview link={mapping[match.params.alias]} />
  )

  const CvView = () => (
    <DirectLinkContext.Provider value={false}>
      <Cv portfolio={portfolio} />
    </DirectLinkContext.Provider>
  )

  const Index = () => (
    <HashStateAware prefix="/portfolio" initial={initial}>
      {(data: State, set: (innerData: State) => void) => {
        const field = fieldBox(box(data, set))
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
