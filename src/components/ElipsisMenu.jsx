import React from 'react'

function ElipsisMenu({type, setOpenEditModal, setOpenDeleteModal}) {
  return (
    <div className={type === 'Boards'? 'absolute top-16 right-5': 'absolute top-6 right-4'}>
        <div className="flex justify-end items-center">
            <div className="w-40 text-sm z-50 font-medium shadow-md 
            shadow-[#364e7e1a] bg-white dark:bg-[#20212c] space-y-4 py-5 px-4 rounded-l h-auto pr-12">
                <p className='cursor-pointer dark: text-grey-400 text-grey-700' 
                onClick={()=> {
                    setOpenEditModal()
                }}>
                    Editar {type}
                </p>
                <p className="cursor-pointer text-red-500" onClick={()=> {
                    setOpenDeleteModal()
                }}>
                    Eliminar {type}
                </p>
            </div>
        </div>
    </div>
  )
}

export default ElipsisMenu