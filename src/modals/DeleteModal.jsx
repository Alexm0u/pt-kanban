import React from 'react'

function DeleteModal({type, title, onDeleteBtnClick}) {
  return (
    // MODAL CONTAINER 
    <div className='fixed right-0 bottom-0 left-0 top-0 px-2 py-4 
    overflow-scroll scrollbar-hide z-50 justify-center items-center flex bg-[#00000080]'>
{/* MODAL DE ELIMINAR  */}
        <div className="scrollbar-hide overflow-y-scroll max-h-[95vh] my-auto
        bg-white dark:bg-[#2b2c37] text-black dark:text-white w-full px-8 py-8 rounded-xl">
            <h3 className="font-bold text-red-500 text-xl">
                Eliminar {type} ?
            </h3>
            {type === 'task'? (
                <p className='text-grey-500 font-semibold tracking-wide text-sm pt-6'>
                    ¿ Estás seguro de que quieres eliminar "{title}" ?
                </p>
            )   :<p className='text-grey-500 font-semibold tracking-wide text-sm pt-6'>
                    ¿ Estás seguro de que quieres eliminar "{title}" ?
                </p>}
        </div>

    </div>
  )
}

export default DeleteModal