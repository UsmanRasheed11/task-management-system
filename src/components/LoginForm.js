import React, { useContext, useState } from 'react';
import { TaskContext } from '../context/TaskContext';
import '../styles/LoginForm.css';

const LoginForm = () => {
  const { handleLogin } = useContext(TaskContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the handleLogin function passed from the parent component (e.g., App.js)
    handleLogin(email, password);
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Login</button>
      </form>
      <p className="message">
        For demo purposes, you can use the following accounts to test the app:
        <br />
        - Email: user1@example.com, Password: 123 (Group: group1)
        <br />
        - Email: user2@example.com, Password: 123 (Group: group1)
        <br />
        - Email: user3@example.com, Password: 123 (Group: group2)
      </p>
    </div>
  );
};

export default LoginForm;
