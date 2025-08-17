import React from 'react'
import Canvas from './components/Canvas'
import Main from './components/Main'
import './index.css'

const App = () => {
  return (
    <div>
      <Main/>
      {/* <Canvas width="900" height="500" style={{background:'#1C1C1C',border:'2px solid black',cursor:'url("/cursor/edit.png"), auto'}} /> */}
    </div>
  )
}

export default App