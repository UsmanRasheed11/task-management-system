import React, { createContext, useState, useEffect } from 'react';
import { fetchTasks as fetchTasksAPI, addTask as addTaskAPI, updateTask, deleteTask } from '../mock/mockApi';
import { mockLogin } from '../mock/mockLoginApi';
import { toast } from 'react-hot-toast';
import { io } from 'socket.io-client';

const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [socket, setSocket] = useState(null);

  const connectToSocket = () => {
    const socket = io('http://localhost:5000'); // Replace with your server URL
    setSocket(socket);
  };

  useEffect(() => {
    // Fetch tasks for the current user's group when the component mounts
    if(user) {
      fetchTasksAPI(user?.group).then((tasks) => setTasks(tasks));
    }
    else {
      fetchTasksAPI('').then((tasks) => setTasks(tasks));
    }
  }, [user]);

  useEffect(() => {
    connectToSocket(); // Connect to the WebSocket server on component mount
    return () => {
      if (socket) {
        socket.disconnect(); // Disconnect from the WebSocket server on component unmount
      }
    };
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const loggedInUser = await mockLogin(email, password);
      setUser(loggedInUser);
      toast.success('Successfully Login!', {
        duration: 3000,
      });
    } catch (error) {
      toast.error('Login Failed!', {
        duration: 3000,
      });
      setUser(null);
    }
  };

  const handleLogout = () => {
    setUser(null);
    toast.success('Successfully Logout!', {
      duration: 3000,
    });
  };

  const addTask = (newTask) => {
    addTaskAPI({...newTask, groupId: user.group}).then((addedTask) => {
      setTasks((prevTasks) => [...prevTasks, addedTask]);
      toast.success('New task added successfully!', {
        duration: 3000,
      });
    });
  };

  const toggleTaskStatus = (taskId) => {
    const taskToUpdate = tasks.find((task) => task.id === taskId);
    if (taskToUpdate) {
      const updates = { completed: !taskToUpdate.completed };
      updateTask(taskId, updates).then((updatedTask) => {
        if (updatedTask) {
          setTasks((prevTasks) =>
            prevTasks.map((task) => (task.id === taskId ? { ...task, ...updates } : task))
          );
          toast.success(`Task: ${taskToUpdate.title} status updated!`, {
            duration: 3000,
          });
        }
      });
      
    }
  };

  const handleDeleteTask = (taskId) => {
    deleteTask(taskId).then((deletedTask) => {
      if (deletedTask) {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        toast.error('Task deleted: '+ deletedTask.title, {
          duration: 3000,
        });
      }
    });
  };

  const moveTask = (fromIndex, toIndex) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      const [movedTask] = updatedTasks.splice(fromIndex, 1);
      updatedTasks.splice(toIndex, 0, movedTask);
      return updatedTasks;
    });
    toast.success('Task moved!', {
      duration: 3000,
    });
  };

  return (
    <TaskContext.Provider value={{ tasks, user, socket, handleLogin, handleLogout, addTask, moveTask, toggleTaskStatus, deleteTask: handleDeleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export { TaskContext, TaskProvider };
