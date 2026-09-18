import _ from 'lodash'
import { Navigate, Route, HashRouter as Router, Routes, useParams } from 'react-router-dom'
import { box, fieldBox } from './Box'
import Cv from './Cv'
import HashStateAware from './HashStateAware'
import { DirectLinkContext, type Link, LinkPreview } from './Link'
import { ALL, type Portfolio } from './model'
import Site, { groups, typeToSpecMapping } from './Site'

interface State {
  selectedId: number | null
  selectedSpecs: string[]
  selectedGroup: string
  menuIsVisible: boolean
  selectedTag: string
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

  for (const it of [...portfolio.links, ...portfolio.people]) {
    mapping[it.alias] = it
  }

  const Shortener = () => {
    const { alias } = useParams<'alias'>()
    return <LinkPreview link={mapping[alias as string]} />
  }

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
        <Route path="/" element={<Navigate to="/portfolio" replace />} />
        <Route path="/sh/:alias" element={<Shortener />} />
        <Route path="/portfolio/*" element={<Index />} />
        <Route path="/cv" element={<CvView />} />
      </Routes>
    </Router>
  )
}

export default App
