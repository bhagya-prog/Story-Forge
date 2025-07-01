import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(15)
  let counter = 15;
  const addValue = () => {
    setCount(counter + 1);
  }
  const removeValue = () => {
    setCount(counter -1);
  }
  return (
    <>
      <h1>Bhagya Vardhan</h1>
      <h2>Counter value: {counter}</h2>
      <button onClick={addValue}>
        Add value
      </button> <br />
      <button onClick={removeValue}>
        Reduce Value
      </button>
    </>
  )
}

export default App
