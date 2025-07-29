import React from 'react'
import Canvas from './components/Canvas'

const App = () => {
  return (
    <div>
      <Canvas width="800" height="500" style={{background:'lightblue'}} onClick={()=>alert('Canvas Clicked')}/>
    </div>
  )
}

export default App