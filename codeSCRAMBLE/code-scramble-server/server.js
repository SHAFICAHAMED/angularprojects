const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const { checkAnswer, getRandomQuestion } = require('./utils/codechecker');

const app = express();
const server = http.createServer(app);

app.use(cors());

const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const rooms = {};

io.on('connection', (socket) => {
  console.log('[Socket Connected] ID:', socket.id);

  socket.on('createRoom', ({ roomId, name }) => {
    console.log(`[Create Room] RoomID: ${roomId}, Player: ${name}`);

    if (!rooms[roomId]) {
      rooms[roomId] = {
        players: {},
        currentQuestion: null
      };
    }

    rooms[roomId].players[socket.id] = { name, score: 0 };
    socket.join(roomId);

    console.log(`[Room ${roomId}] Players:`, rooms[roomId].players);
    io.to(roomId).emit('leaderboardUpdate', rooms[roomId].players);
  });

  socket.on('joinRoom', ({ roomId, name }) => {
    console.log(`[Join Room] RoomID: ${roomId}, Player: ${name}`);

    if (rooms[roomId]) {
      rooms[roomId].players[socket.id] = { name, score: 0 };
      socket.join(roomId);

      console.log(`[Room ${roomId}] Players after join:`, rooms[roomId].players);
      io.to(roomId).emit('leaderboardUpdate', rooms[roomId].players);
    } else {
      console.log(`[Join Room Failed] Room ${roomId} not found`);
      socket.emit('roomNotFound');
    }
  });

  socket.on('startGame', ({ roomId }) => {
    console.log(`[Start Game] RoomID: ${roomId}`);

    if (rooms[roomId]) {
      const newQuestion = getRandomQuestion();
      rooms[roomId].currentQuestion = newQuestion;

      console.log(`[Room ${roomId}] Starting with Question ID: ${newQuestion.id}`);
      io.to(roomId).emit('newQuestion', {
        question: newQuestion.question,
        id: newQuestion.id
      });
    }
  });

  socket.on('submitCode', ({ code, questionId }) => {
    console.log(`[Code Submitted] Socket: ${socket.id}, QuestionID: ${questionId}, Code:`, code);

    const roomId = Object.keys(rooms).find((room) =>
      io.sockets.adapter.rooms.get(room)?.has(socket.id)
    );
    if (!roomId) {
      console.log(`[Error] Socket ${socket.id} not found in any room`);
      return;
    }

    const isCorrect = checkAnswer(code, questionId);
    console.log(`[Check Answer] Room: ${roomId}, Correct: ${isCorrect}`);

    if (isCorrect) {
      rooms[roomId].players[socket.id].score += 1;
      socket.emit('codeResult', { correct: true, message: 'Correct!' });

      const newQuestion = getRandomQuestion();
      rooms[roomId].currentQuestion = newQuestion;

      console.log(`[New Question] Room: ${roomId}, QuestionID: ${newQuestion.id}`);
      io.to(roomId).emit('newQuestion', {
        question: newQuestion.question,
        id: newQuestion.id
      });
    } else {
      socket.emit('codeResult', { correct: false, message: 'Wrong!' });
    }

    console.log(`[Leaderboard Update] Room: ${roomId}`, rooms[roomId].players);
    io.to(roomId).emit('leaderboardUpdate', rooms[roomId].players);
  });

  socket.on('disconnect', () => {
    console.log('[Socket Disconnected]', socket.id);

    for (const roomId in rooms) {
      if (rooms[roomId].players[socket.id]) {
        delete rooms[roomId].players[socket.id];
        console.log(`[Room ${roomId}] Player ${socket.id} removed`);
        io.to(roomId).emit('leaderboardUpdate', rooms[roomId].players);
      }
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
