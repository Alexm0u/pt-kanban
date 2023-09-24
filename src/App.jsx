import React, { useState } from 'react'
import Header from './components/Header'
import Center from './components/Center'
import EmptyBoard from './components/EmptyBoard'
import boardsSlice from './redux/boardsSlice'
import { useDispatch, useSelector } from 'react-redux'

function App() {
  const dispatch = useDispatch()

  const boards = useSelector ((state)  => state.boards)
  const activeBoard = boards.find(board => board.isActive)
  if (!activeBoard && boards.length > 0) {
    dispatch(boardsSlice.actions.setBoardActive({index:0}))}
  

  const [boardModalOpen, setBoardModalOpen] = useState(false)

  return (
    <div className='overflow-hidden overflow-x-scroll bg-[#0f766e] dark:bg-[#22163af0]'>
      <>
      {
      boards.length > 0 ? 
      <>
      {/* HEADER SECTION */}
      <Header boardModalOpen = {boardModalOpen} setBoardModalOpen = {setBoardModalOpen}/>
      {/* CENTER SECTION */}
      </>
      :
      <>
      <EmptyBoard type='add'/>
      </>
      }
      <Center boardModalOpen = {boardModalOpen} setBoardModalOpen = {setBoardModalOpen}/>
      </>
    </div>
  )
}

export default App