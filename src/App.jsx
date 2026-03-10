import { useState } from 'react'
import logo from './assets/thekattis.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <img src={logo} alt="The Katti's" width="450" height="450" />
      <h1 className='title-text'>The Katti's - Royal Authentic Aroma (since 2022)</h1>
      <h3 className='pro-owner'>Proprietor: Priscilla Katti</h3>
    </>
  )
}

export default App
