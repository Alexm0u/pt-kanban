import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import crossIcon from '../assets/icon-cross.svg'

function AddEditTaskModal({type, device, setOpenAddEditTask}) {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const [subtasks, setSubtasks] = useState(
        [
            { title: '' , isCompleted : false , id: uuidv4() },
            { title: '' , isCompleted : false , id: uuidv4() },
            
        ]
    )

    const onChange = (id, newValue) => {
        setSubtasks((pervState) => {
          const newState = [...pervState]
          const subtask = newState.find((subtask)=> subtask.id === id)
          subtask.name = newValue
          return newState
        })
      }

    const onDelete = (id) => {
        setSubtasks((perState)=> perState.filter((el)=> el.id !== id))
      }


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
                placeholder='Ej. Revisar mail'/>
            </div>
            {/* SUBTAREAS  */}
            <div className="mt-8 flex flex-col space-y-1">
                <label className="text-sm dark:text-white text-grey-500">
                    Subtareas
                </label>
                
                {
                subtasks.map((subtask, index)=> (
                    <div 
                    key={index}
                    className='flex items-center w-full'
                    >
                        <input 
                        onChange={(e)=>{
                            onChange(subtask.id, e.target.value)
                        }}
                        type='text'
                        value={subtask.title}
                        className='bg-transparent outline-none focus:border-0 border flex-grow 
                        px-4 py-2 rounded-md text-sm border-grey-600 focus:outline-[#635fc7]'
                        placeholder='Ej. Responder mails pendientes'
                        />
                        <img 
                        onClick={() => {
                            onDelete(subtask.id)
                        }}
                        src={crossIcon} className='m-4 cursor-pointer'/>
                    </div>
                    ))}
                    <button 
                    onClick={()=> {
                        setSubtasks((state)=> [...state,{title: '' , isCompleted : false , id: uuidv4()},
                    ])
                    }}
                    className='w-full items-center
                    dark:text-[#635fc7] dark:bg-white text-white bg-[#635fc7] py-2 rounded-full'>
                        Añadir subtarea
                    </button>
            </div>

            {/* NOTAS  */}
            <div className="mt-8 flex flex-col space-y-1">
                <label className="text-sm dark:text-white text-grey-500">Notas</label>
                <textarea value={description} onChange={(e)=> setDescription(e.target.value)}
                className='bg-transparent px-4 py-2 outline-none focus:border-0 min-h-[200px] rounded-md text-sm 
                border border-grey-600 focus:outline-[#635fc7] ring-0'
                placeholder='Ej. Comprobar si se ha recibido algún correo nuevo'/>
            </div>
            
        </div>
            
    
    
    
    </div>
  )
}

export default AddEditTaskModal