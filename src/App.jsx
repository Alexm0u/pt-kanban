import React, { useState } from 'react'
import Header from './components/Header'
import Center from './components/Center'

function App() {

  const [boardModalOpen, setBoardModalOpen] = useState(false)

  return (
    <div>

    {/* HEADER SECTION */}
      <Header boardModalOpen = {boardModalOpen} setBoardModalOpen = {setBoardModalOpen}/>


      {/* CENTER SECTION */}
      <Center/>
    </div>
  )
}

export default App