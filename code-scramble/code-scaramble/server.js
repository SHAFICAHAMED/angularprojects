// const express=require('express')
// const http=require('http')
// const socketIo=require('socket.io')
// const cors=require('cors')
// const { checkAnswer,getRandomQuestion } = require('./utils/codeChecker');
// const app=express();

// // scores={}

// const players={name:'',score:0}

// app.use(cors());

// const server=http.createServer(app);

// const io=socketIo(server,{
//     cors:{origin:'*'}
// });

// io.on('connection',(socket)=>{
//     console.log("Player Connnected:", socket.id);
//     socket.on('joinGame',(playerName)=>{
//     players[socket.id] = { name: playerName, score: 0 };
//         const question = getRandomQuestion();

//         socket.emit('newQuestion',question);
//         io.emit('leaderboardUpdate',players);
//     });

//     // scores[socket.id]=0

    

//     socket.on('submitCode',({code,questionId})=>{
//         const iscorrect=checkAnswer(code,questionId);

//         if(iscorrect&&players[socket.id]){
//             players[socket.id].score+=1;
//             socket.emit('codeResult',{correct:true,message:'Correct!!'});

//             io.emit('leaderboardUpdate',players);

//             const newQ=getRandomQuestion();
//             io.emit('newQuestion',newQ);

//         }
//         else{
//             socket.emit('codeResult',{correct:false,message:"Wrong!"})
//         }
//     }

// );
    
//     socket.on('disconnect',()=>{
//         delete players[socket.id];
//         io.emit('leaderboardUpdate',players);
//         console.log('Player disconnected:',socket.id);
//     });
// });

// server.listen(3000,()=>{
// console.log("server running on port http://localhost:3000")
// });



//add room
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const { checkAnswer, getRandomQuestion } = require('./utils/codeChecker');

const app = express();
const server = http.createServer(app);

// Enable CORS
app.use(cors());

// Initialize Socket.io with the server
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const rooms = {};

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('createRoom', ({ roomId, name }) => {
    console.log(`Creating room: ${roomId} by player: ${name}`);
    if (!rooms[roomId]) {
      rooms[roomId] = {
        players: {},
        currentQuestion: null
      };
    }
    rooms[roomId].players[socket.id] = { name, score: 0 };
    socket.join(roomId);
    console.log(`Player ${name} joined room ${roomId}`);
    io.to(roomId).emit('leaderboardUpdate', rooms[roomId].players);
  });

  socket.on('joinRoom', ({ roomId, name }) => {
    console.log(`Player ${name} attempting to join room ${roomId}`);
    if (rooms[roomId]) {
      rooms[roomId].players[socket.id] = { name, score: 0 };
      socket.join(roomId);
      console.log(`Player ${name} joined room ${roomId}`);
      io.to(roomId).emit('leaderboardUpdate', rooms[roomId].players);
    } else {
      console.log(`Room ${roomId} not found for player ${name}`);
      socket.emit('roomNotFound');
    }
  });

  socket.on('startGame', ({ roomId }) => {
    console.log(`Start game requested for room ${roomId}`);
    if (rooms[roomId]) {
      const newQuestion = getRandomQuestion();
      rooms[roomId].currentQuestion = newQuestion;
      console.log(`Sending new question to room ${roomId}`, newQuestion);
      io.to(roomId).emit('newQuestion', {
        question: newQuestion.question,
        id: newQuestion.id
      });
    }
  });

  socket.on('submitCode', ({ code, questionId }) => {
    console.log(`Code submitted from ${socket.id} for question ${questionId}`);
    const roomId = Object.keys(rooms).find((room) =>
      io.sockets.adapter.rooms.get(room)?.has(socket.id)
    );
    if (!roomId) {
      console.log(`Room not found for socket ${socket.id}`);
      return;
    }

    const isCorrect = checkAnswer(code, questionId);
    if (isCorrect) {
      rooms[roomId].players[socket.id].score += 1;
      socket.emit('codeResult', { correct: true, message: 'Correct!' });
      console.log(`Correct answer from ${socket.id} in room ${roomId}`);

      const newQuestion = getRandomQuestion();
      rooms[roomId].currentQuestion = newQuestion;
      io.to(roomId).emit('newQuestion', {
        question: newQuestion.question,
        id: newQuestion.id
      });
    } else {
      console.log(`Wrong answer from ${socket.id} in room ${roomId}`);
      socket.emit('codeResult', { correct: false, message: 'Wrong!' });
    }

    io.to(roomId).emit('leaderboardUpdate', rooms[roomId].players);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    for (const roomId in rooms) {
      if (rooms[roomId].players[socket.id]) {
        console.log(`Removing player ${socket.id} from room ${roomId}`);
        delete rooms[roomId].players[socket.id];
        io.to(roomId).emit('leaderboardUpdate', rooms[roomId].players);
      }
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
