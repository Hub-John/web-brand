import { useState } from 'react'
import viteLogo from './assets/background.jpg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className='title-text'>The Katti's - Where Family Flavors Come Alive!</h1>
      <h3 className='pro-owner'>Proprietor: Priscilla Katti</h3>
    </>
  )
}

export default App
