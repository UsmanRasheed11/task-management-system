import React, { useContext } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { TaskContext } from '../context/TaskContext';

function Task({ task, index, moveTask }) {
  const { toggleTaskStatus, deleteTask } = useContext(TaskContext);

  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'TASK',
    hover: (item) => {
      if (item.index !== index) {
        moveTask(item.index, index);
        item.index = index;
      }
    },
  });

  const handleToggle = () => {
    toggleTaskStatus(task.id);
  };

  const handleDelete = () => {
    deleteTask(task.id);
  };

  return (
    <div className={`task ${isDragging ? 'dragging' : ''}`} ref={(node) => drag(drop(node))}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <button onClick={handleToggle}>{task.completed ? 'Incomplete' : 'Completed'}</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default Task;
