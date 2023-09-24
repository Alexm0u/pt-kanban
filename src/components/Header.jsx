import React, { useState } from 'react'
import logo from '../assets/logo-mobile.svg'
import iconDown from '../assets/icon-chevron-down.svg'
import iconUp from '../assets/icon-chevron-up.svg'
import elipsis from '../assets/icon-vertical-ellipsis.svg'
import HeaderDropdown from './HeaderDropdown'
import AddEditBoardModal from '../modals/addEditBoardModal'
import { useDispatch, useSelector } from 'react-redux'
import AddEditTaskModal from '../modals/AddEditTaskModal'
import ElipsisMenu from './ElipsisMenu'
import DeleteModal from '../modals/DeleteModal'
import boardsSlice from '../redux/boardsSlice'


function Header({setBoardModalOpen, boardModalOpen}) {

  const dispatch = useDispatch()

  const [openDropdown, setOpenDropdown] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [openAddEditTask, setOpenAddEditTask] = useState(false)
  const [isElipsisOpen, setIsElipsisOpen] = useState(false)
  const [boadType , setBoadType] = useState('add')

  const boards = useSelector((state) => state.boards)
  const board = boards.find(board => board.isActive)
  const setOpenEditModal = () => {
    setBoardModalOpen(true)
    setIsElipsisOpen(false)
  }
  const setOpenDeleteModal = () => {
    setIsDeleteModalOpen(true)
    setIsElipsisOpen(false)
  }
  const onDeleteBtnClick = ()=> {
    dispatch(boardsSlice.actions.deleteBoard())
    dispatch(boardsSlice.actions.setBoardActive({index:0}))
    setIsDeleteModalOpen(false)
  }
  const onDropdownClick = () => {
    setOpenDropdown(state => !state)
    setIsElipsisOpen(false)
    setBoadType('add')

  }
  


  return (
    <div className='p-4 fixed left-0 bg-white dark:bg-[#2b2c37] z-50 right-0'>

        <header className='flex justify-between dark:text-white items-center'>
            {/* LEFT SIDE */}

            <div className='flex items-center space-x-2 md:space-x-4 '>
                <img src={logo} alt="logo" className='h-6 w-6'/>
                <h3 className='hidden md:inline-block font-bold font-sans md:text-4xl text-[#1a6b4782] dark:text-white'>
                  Gestor de Tareas
                </h3>
                <div className='flex items-center '>
                  <h3 className='truncate max-w-[200px] md:text-2xl text-xl font-bold md:ml-20 font-sans text-[#0f766e]  dark:text-white'>
                    {board.name}
                  </h3>
                  <img src={openDropdown ? iconUp : iconDown} alt="dropdown icon" className='w-3 ml-2 
                  cursor-pointer md:hidden'
                  onClick={onDropdownClick}/>
                </div>
            </div>

            {/* RIGHT SIDE  */}

            <div onClick={()=> {
                setOpenAddEditTask(state => !state)}}  className="flex space-x-4 items-center md:space-x-6 ">
              <button className='hidden md:block button bg-[#1a6b4782] dark:bg-[#0f766e] text-[#0f766e] font-bold  dark:text-white'>
                + Añadir tarea
              </button>

              <button onClick={()=> {
                setOpenAddEditTask(state => !state)}} 
                className='button py-1 px-3 md:hidden bg-[#1a6b4782]  text-[#0f766e] dark:bg-[#0f766e]  dark:text-white'>
                +
              </button>

              <img src={elipsis} 
              onClick={()=> {
                setBoadType('edit')
                setOpenDropdown(false)
                setIsElipsisOpen(state=> !state)
              }} alt="elipsis" className='cursor-pointer h-6'/>

              {isElipsisOpen && <ElipsisMenu 
              setOpenDeleteModal={setOpenDeleteModal}
              setOpenEditModal={setOpenEditModal} 
              type='Tablero'/>}


            </div>
        </header>

        {openDropdown && <HeaderDropdown setBoardModalOpen=
        {setBoardModalOpen} setOpenDropdown={setOpenDropdown}/>}

        {boardModalOpen && <AddEditBoardModal type={boadType} setBoardModalOpen={setBoardModalOpen}/>}

        {openAddEditTask && <AddEditTaskModal setOpenAddEditTask={setOpenAddEditTask} device='mobile' type='add'/>}

        {isDeleteModalOpen && <DeleteModal setIsDeleteModalOpen = {setIsDeleteModalOpen} onDeleteBtnClick={onDeleteBtnClick} title={board.name} type='tablero' />}

    </div>
  )
}

export default Header