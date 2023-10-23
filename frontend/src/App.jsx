import './App.css'
import NavBar from './components/NavBar'
import Tile from './components/Tile.jsx'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <>
      <NavBar/>
      <Outlet/>
    </>
  )
}

export default App
