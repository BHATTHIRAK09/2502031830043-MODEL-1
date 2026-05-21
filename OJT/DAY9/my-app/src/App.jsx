// import { useState } from 'react'
import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import './App.css'
import Hello from './Hello'
import Bye from './Bye'

function App() {


  return (
    <>
      <h1>Day 9 - React Router</h1>
      <Hello />
      <Bye />
      <img src={reactLogo} />
    </>
  )
}

export default App
