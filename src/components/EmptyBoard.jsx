import React, { useState } from 'react'

function EmptyBoard({type}) {
const [isBoardModalOpen, setIsBoardModalOpen] = useState(false)

  return (
    <div className='bg-white dark:bg-[#2b2c37] h-screen w-screen flex flex-col  items-center justify-center'>
      <h3 className=" text-gray-500 font-bold">
        {type === 'edit'? 'Este tablero está vacío, crea una nueva columna para empezar': 'No hay tableros disponibles, crea un nuevo tablero para empezar'}
      </h3>
      <button onClick={() => {
          setIsBoardModalOpen(true);
        }} className="w-full items-center max-w-xs font-bold hover:opacity-70
       dark:text-white dark:bg-[#635fc7] mt-8 relative  text-white bg-[#635fc7] py-2 rounded-full">
        {type === 'edit'? 'Añadir nueva columna': 'Añadir nuevo tablero'}
       </button>
       {isBoardModalOpen && (
        <AddEditBoardModal type={type} setBoardModalOpen = {setIsBoardModalOpen}/>
       )}
    </div>
  )
}

export default EmptyBoard