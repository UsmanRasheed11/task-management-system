import React, { useContext } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import LoginForm from './components/LoginForm';
import { ToastBar, Toaster, toast } from 'react-hot-toast';
import { TaskContext } from './context/TaskContext';
import './styles/styles.css';

function App() {
  const { user, handleLogout } = useContext(TaskContext);
  return (
    <div>
      {user ? (
        // If the user is logged in, render the TaskManagement component
        <>
        <div className="user-section">
          <p>Welcome, {user.email}!</p>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <div className="container">
        <h1>Task Management System</h1>
          <TaskForm />
          <TaskList />
          </div>
          </>
      ) : (
        // If the user is not logged in, render the LoginForm component
        <LoginForm />
      )}
      <Toaster position={"top-right"} toastOptions={{ className: 'react-hot-toast' }}>
        {(t) => (
          <ToastBar toast={t}>
            {({ icon, message }) => (
              <>
                {icon}
                {message}
                {t.type !== 'loading' && (
                  <span style={{ cursor: 'pointer' }} onClick={() => toast.dismiss(t.id)}>X</span>
                )}
              </>
            )}
          </ToastBar>
        )}
      </Toaster>
    </div>
  );
}

export default App;
