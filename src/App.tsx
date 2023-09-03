import _ from 'lodash'
import { HashRouter as Router, redirect, Route, Routes } from 'react-router-dom'


import Cv from './Cv'
import HashStateAware from './HashStateAware'
import { DirectLinkContext, LinkPreview, Link } from './Link'
import { ALL, Portfolio } from './model'
import Site, { groups, typeToSpecMapping } from './Site'
import { box, fieldBox } from './Box'

type State = {
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
  const mapping: { [key: string]: Link } = {}

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
      <Routes>
        <Route path="/" action={() => redirect("/portfolio")} />
        <Route path="/sh/:alias" Component={Shortener} />
        <Route path="/portfolio" Component={Index} />
        <Route path="/cv" Component={CvView} />
      </Routes>
    </Router>
  )
}

export default App
