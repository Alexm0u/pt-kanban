import React, { useState } from 'react'

function AddEditTaskModal({type, device, setOpenAddEditTask}) {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')




  return (
    <div 
    onClick={(e)=> {
        if (e.target !== e.currentTarget) {
            return 
        }
        setOpenAddEditTask(false)
    }}
    className={device === 'mobile'? 
    'py-6 px-6 pb-40 absolute overflow-y-scroll left-0 flex right-0 bottom-[-100vh] top-0 bg-[#00000080]': 
    'py-6 px-6 pb-40 absolute overflow-y-scroll left-0 flex right-0 bottom-0 top-0 bg-[#00000080]'}
    >
        {/* MODAL SECTION  */}
        <div className="scrollbar-hide overflow-y-scroll max-h-[95vh] my-auto bg-white dark:bg-[#2b2c37]
        text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8 
        rounded-xl">
            <h3 className="text-lg">
                {type==='edit'? 'Editar': 'Añadir'} Tarea
            </h3>
            {/* NOMBRE TAREA  */}
            <div className="mt-8 flex flex-col space-y-1">
                <label className="text-sm dark:text-white text-grey-500">Nombre de la tarea</label>
                <input value={title} onChange={(e)=> setTitle(e.target.value)}
                className='bg-transparent px-4 py-2 outline-none focus:border-0 rounded-md text-sm 
                border border-grey-600 focus:outline-[#635fc7] ring-0'
                type="text"
                placeholder='ej Revisar mail'/>
            </div>

            {/* DESCRIPCIÓN  */}
            <div className="mt-8 flex flex-col space-y-1">
                <label className="text-sm dark:text-white text-grey-500">Descripción</label>
                <textarea value={description} onChange={(e)=> setDescription(e.target.value)}
                className='bg-transparent px-4 py-2 outline-none focus:border-0 min-h-[200px] rounded-md text-sm 
                border border-grey-600 focus:outline-[#635fc7] ring-0'
                placeholder='ej Comprobar si se ha recibido algún correo nuevo'/>
            </div>
        </div>

    </div>
  )
}

export default AddEditTaskModal