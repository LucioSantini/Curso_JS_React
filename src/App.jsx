import { useState } from 'react'
import { Navegador } from './components/NavBar'
import { Saludo } from './components/ItemListContainer'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
  <>

  <Navegador />
  <Saludo nombre = "Lucio" dia = "Jueves" />
  </>
)
}

export default App
