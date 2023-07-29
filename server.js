// server.js
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIO(server,{
  cors: {
    origin: 'http://localhost:3000', // Replace with the origin of your React app
    methods: ['GET', 'POST'],
  },
});

const PORT = 5000;

app.use(cors());

// Array to store connected clients (users)
const connectedClients = [];

io.on('connection', (socket) => {
  // New client connected
  console.log('New client connected: ' + socket.id);

  // Store the client's socket ID in the array
  connectedClients.push(socket.id);

  socket.on('disconnect', () => {
    // Client disconnected
    console.log('Client disconnected: ' + socket.id);

    // Remove the client's socket ID from the array
    const index = connectedClients.indexOf(socket.id);
    if (index !== -1) {
      connectedClients.splice(index, 1);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
