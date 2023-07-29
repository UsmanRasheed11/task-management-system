import React, { useContext, useEffect } from 'react';
import toast from 'react-hot-toast';
import { TaskContext } from '../context/TaskContext';
import Task from './Task';

function TaskList() {
  const { tasks, socket, moveTask, toggleTaskStatus, deleteTask } = useContext(TaskContext);

  useEffect(() => {
    if (socket) {
      socket.on('taskUpdated', (updatedTask) => {
        toggleTaskStatus(updatedTask);
        toast.success('Task updated: ' + updatedTask.title);
      });

      socket.on('taskDeleted', (deletedTask) => {
        deleteTask(deletedTask);
        toast.error('Task deleted: ' + deletedTask.title);
      });
    }

    return () => {
      if (socket) {
        // Clean up event listeners on component unmount
        socket.off('taskUpdated');
        socket.off('taskDeleted');
      }
    };
  }, [socket, toggleTaskStatus, deleteTask]);

  return (
    <div className="task-list">
      {tasks.length > 0 ? tasks.map((task, index) => (
        <Task
          key={task.id}
          task={task}
          index={index}
          moveTask={moveTask}
          toggleTaskStatus={toggleTaskStatus}
          deleteTask={deleteTask}
        />
      )) : (
        <p className="no-tasks">No tasks found. Add a new task!</p>
      )}
    </div>
  );
}

export default TaskList;
