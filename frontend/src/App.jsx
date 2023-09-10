import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import QuestionBank from './QuestionBank'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <QuestionBank />
    </>
  )
}

export default App
