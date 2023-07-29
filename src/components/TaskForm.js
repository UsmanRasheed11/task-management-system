import React, { useState, useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import { toast } from 'react-hot-toast';

const TaskForm = () => {
  const { socket, addTask } = useContext(TaskContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === '' || description.trim() === '') {
      toast.error('Please fill in all fields.');
      return;
    }

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      completed: false,
    };

    addTask(newTask);
    socket.emit('taskAdded', newTask);

    setTitle('');
    setDescription('');

  };

  return (
    <div>
      <form className="task-form" onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description"
        />

        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
