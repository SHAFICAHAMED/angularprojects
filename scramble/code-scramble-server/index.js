// index.js
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*', // Allow your Angular frontend
    methods: ['GET', 'POST']
  }
});

// Game data (in-memory)
let users = {};
let leaderboard = {};
let currentPuzzle = null;

// Sample puzzle (you can randomize later)
const samplePuzzle = {
  id: 1,
  language: 'JavaScript',
  lines: [
    'function greet(name) {',
    '  console.log("Hello, " + name);',
    '}'
  ],
  correct: `function greet(name) {\n  console.log("Hello, " + name);\n}`
};

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// On client connection
io.on('connection', (socket) => {
  console.log(`⚡ New user connected: ${socket.id}`);

  socket.on('join', (username) => {
    users[socket.id] = username;
    leaderboard[username] = 0;

    // Send current puzzle
    currentPuzzle = { ...samplePuzzle, lines: shuffle([...samplePuzzle.lines]) };
    socket.emit('puzzle', currentPuzzle);
    io.emit('leaderboard', leaderboard);
  });

  socket.on('submit', (data) => {
    const { answer } = data;
    const username = users[socket.id];

    if (!username) return;

    if (answer.trim() === samplePuzzle.correct.trim()) {
      leaderboard[username] += 10;
      io.emit('message', `${username} solved it!`);
      io.emit('leaderboard', leaderboard);

      // New puzzle logic here (for now re-sending same)
      currentPuzzle = { ...samplePuzzle, lines: shuffle([...samplePuzzle.lines]) };
      io.emit('puzzle', currentPuzzle);
    } else {
      socket.emit('message', 'Incorrect! Try again.');
    }
  });

  socket.on('disconnect', () => {
    const username = users[socket.id];
    delete leaderboard[username];
    delete users[socket.id];
    io.emit('leaderboard', leaderboard);
  });
});

// Start server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
