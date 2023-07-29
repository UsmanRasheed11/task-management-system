const mockUsers = [
  { id: 1, email: 'user1@example.com', group: 'group1', password: '123' },
  { id: 2, email: 'user2@example.com', group: 'group1', password: '123' },
  { id: 3, email: 'user3@example.com', group: 'group2', password: '123' },
];

const mockLogin = (email, password) => {
  // You can implement your login logic here (e.g., calling an API or using Firebase authentication)
  // For simplicity, we'll just check if the email and password are correct
  const foundUser = mockUsers.find((u) => u.email === email);
  if (foundUser && foundUser.password === password) {
    return Promise.resolve(foundUser); // Return the user object if login is successful
  } else {
    return Promise.reject(new Error('Invalid email or password')); // Return an error if login fails
  }
};

export { mockLogin };
