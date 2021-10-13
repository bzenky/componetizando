import { SideBar } from './components/SideBar'
import { Content } from './components/Content'

import './styles/global.scss'
import { GenreState } from './contexts/GenreState'

export function App() {

  return (
    <GenreState>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <SideBar />
        <Content />
      </div >
    </GenreState>
  )
}