import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

function Subtask({index, colIndex, taskIndex}) {

    const dispatch = useDispatch();
    const boards = useSelector((state) => state.boards);
    const board = boards.find((board) => board.isActive === true);
    const columns = board.columns;
    const col = columns.find((col, i) => i === colIndex);
    const task = col.tasks.find((task, i) => i === taskIndex);
    const subtask = task.subtasks.find((subtask, i) => i === index)
    const checked = subtask.isCompleted



  return (
    <div>Subtask</div>
  )
}

export default Subtask