import React from 'react'
import Canvas from './components/Canvas'

const App = () => {
  return (
    <div>
      <Canvas width="900" height="500" style={{background:'#1C1C1C',border:'2px solid black',cursor:'url("/cursor/edit.png"), auto'}} />
    </div>
  )
}

export default App