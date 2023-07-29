// mockAPI.js
const mockTasks = [
  // Sample tasks for demonstration
  {
    id: 1,
    title: 'Complete Task Management App',
    description: 'Build the Task Management System with React.',
    completed: false,
    groupId: 'group1',
  },
  {
    id: 2,
    title: 'Review UI/UX Design',
    description: 'Provide feedback on the UI/UX design of the application.',
    completed: true,
    groupId: 'group1',
  },
];

const fetchTasks = (groupId) =>
  new Promise((resolve) => {
    // Simulate API call delay
    setTimeout(() => {
      const tasks = mockTasks.filter((task) => task.groupId === groupId);
      resolve(tasks);
    }, 500);
  });

const addTask = (newTask) =>
  new Promise((resolve) => {
    // Simulate API call delay
    setTimeout(() => {
      const addedTask = { ...newTask}; // Assign the groupId for simplicity
      mockTasks.push(addedTask);
      resolve(addedTask);
    }, 500);
  });

const updateTask = (taskId, updates) =>
  new Promise((resolve) => {
    // Simulate API call delay
    setTimeout(() => {
      const taskToUpdate = mockTasks.find((task) => task.id === taskId);
      if (taskToUpdate) {
        Object.assign(taskToUpdate, updates);
        resolve(taskToUpdate);
      } else {
        resolve(null);
      }
    }, 500);
  });

const deleteTask = (taskId) =>
  new Promise((resolve) => {
    // Simulate API call delay
    setTimeout(() => {
      const index = mockTasks.findIndex((task) => task.id === taskId);
      if (index !== -1) {
        const deletedTask = mockTasks.splice(index, 1)[0];
        resolve(deletedTask);
      } else {
        resolve(null);
      }
    }, 500);
  });

export { fetchTasks, addTask, updateTask, deleteTask };
