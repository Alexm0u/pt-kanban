import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import crossIcon from "../assets/icon-cross.svg";
import { useDispatch, useSelector } from 'react-redux';
import boardSlices from '../redux/boardsSlice';

function AddEditBoardModal({ setBoardModalOpen, type }) {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [newColumns, setNewColumns] = useState([
    { name: 'Por hacer', task: [], id: uuidv4() },
    { name: 'En curso', task: [], id: uuidv4() },
    { name: 'Finalizada', task: [], id: uuidv4() }
  ]);

  const board = useSelector((state) => state.boards).find(
    (board) => board.isActive
  );

  useEffect(() => {
    // Si el tipo es "edit", establece los datos iniciales del tablero
    if (type === 'edit' && board) {
      setName(board.name);
      setNewColumns(board.columns.map((col) => ({ ...col, id: uuidv4() })));
    }
  }, [type, board]);

  const onChange = (id, newValue) => {
    setNewColumns((prevState) => {
      const newState = [...prevState];
      const column = newState.find((col) => col.id === id);
      column.name = newValue;
      return newState;
    });
  };

  const onDelete = (id) => {
    setNewColumns((prevState) =>
      prevState.filter((el) => el.id !== id)
    );
  };

  const validate = () => {
    setIsValid(false);
    if (!name.trim()) {
      return false;
    }

    for (let i = 0; i < newColumns.length; i++) {
      if (!newColumns[i].name.trim()) {
        return false;
      }
    }
    setIsValid(true);
    return true;
  };

  const onSubmit = () => {
    if (type === 'add') {
      dispatch(boardSlices.actions.addBoard({ name, newColumns }));
    } else if (type === 'edit' && board) {
      // Asegúrate de que los datos se estén pasando correctamente
      const editedBoard = {
        id: board.id,
        name,
        columns: newColumns,
      };
      dispatch(boardSlices.actions.editBoard(editedBoard));
    }

    // Cerrar el modal después de agregar o editar el tablero
    setBoardModalOpen(false);
  };

  return (
    <div
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setBoardModalOpen(false);
      }}
      className="fixed right-0 left-0 top-0 bottom-0 px-2 scrollbar-hide py-4 overflow-scroll z-50 justify-center items-center flex bg-[#00000080]"
    >
      {/* MODAL SECTION */}
      <div className="scrollbar-hide overflow-y-scroll max-h-[95vh] bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-xl">
        <h3 className="text-lg text-[#0f766e] dark:text-white">
          {type === 'edit' ? 'Editar' : 'Add New'} Tablero
        </h3>

        {/* NOMBRE TAREA */}
        <div className="mt-8 flex flex-col space-y-3">
          <label className="text-sm dark:text-white text-grey-500">
            Nombre del tablero
          </label>

          <input
            className="bg-transparent px-4 py-2 rounded-md text-sm border border-grey-600 outline-none focus:outline-[#0f766e] outline-1 ring-0"
            placeholder="e.g Web Design"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            id="board-name-input"
          />
        </div>

        {/* BOARD COLUMNS  */}
        <div className="mt-8 flex flex-col space-y-3">
          <label className="text-sm dark:text-white text-grey-500">
            Estado de las tareas
          </label>
          {newColumns.map((column, index) => (
            <div key={column.id} className="flex items-center w-full">
              <input
                className="bg-transparent flex-grow px-4 py-2 rounded-md text-sm border border-grey-600 outline-none focus:outline-[#0f766e]"
                onChange={(e) => {
                  onChange(column.id, e.target.value);
                }}
                value={column.name}
                type="text"
              />
              <img
                src={crossIcon}
                className="cursor-pointer m-4"
                onClick={() => {
                  onDelete(column.id);
                }}
              />
            </div>
          ))}
        </div>

        <div>
          <button
            className="w-full items-center hover:opacity-75 dark:text-[#0f766e] dark:bg-white text-white bg-[#1a6b4782] mt-2 py-2 rounded-full"
            onClick={() => {
              setNewColumns((state) => [
                ...state,
                { name: '', task: [], id: uuidv4() },
              ]);
            }}
          >
            Añadir columna
          </button>

          <button
            className="w-full items-center hover:opacity-75 dark:text-white dark:bg-[#0f766e] mt-8 relative text-white bg-[#0f766e] py-2 rounded-full"
            onClick={() => {
              const isValid = validate();
              if (isValid === true) onSubmit();
            }}
          >
            {type === 'add' ? 'Crear nuevo tablero' : 'Guardar cambios'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddEditBoardModal;
