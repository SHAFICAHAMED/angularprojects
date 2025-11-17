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

app.use(cors());

const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Store players (non-room players)
const players = {};

// Store rooms
const rooms = {};

io.on('connection', (socket) => {
  console.log('Player connected:', socket.id);

  // ------------------ Quick Join (Single Global Room Style) ------------------
  socket.on('joinGame', (playerName) => {
    players[socket.id] = { name: playerName, score: 0 };

    const question = getRandomQuestion();
    socket.emit('newQuestion', question);
    io.emit('leaderboardUpdate', players);
  });

  // ------------------ Room-Based Multiplayer ------------------
  socket.on('createRoom', ({ roomId, name }) => {
    if (!rooms[roomId]) {
      rooms[roomId] = {
        players: {},
        currentQuestion: null
      };
    }

    rooms[roomId].players[socket.id] = { name, score: 0 };
    socket.join(roomId);
    io.to(roomId).emit('leaderboardUpdate', rooms[roomId].players);
  });

  socket.on('joinRoom', ({ roomId, name }) => {
    if (rooms[roomId]) {
      rooms[roomId].players[socket.id] = { name, score: 0 };
      socket.join(roomId);
      io.to(roomId).emit('leaderboardUpdate', rooms[roomId].players);
    } else {
      socket.emit('roomNotFound');
    }
  });

  socket.on('startGame', ({ roomId }) => {
    if (rooms[roomId]) {
      const newQuestion = getRandomQuestion();
      rooms[roomId].currentQuestion = newQuestion;
      io.to(roomId).emit('newQuestion', {
        question: newQuestion.question,
        id: newQuestion.id
      });
    }
  });

  // ------------------ Code Submission ------------------
  socket.on('submitCode', ({ code, questionId }) => {
    // Check if the user is in a room
    const roomId = Object.keys(rooms).find((room) =>
      io.sockets.adapter.rooms.get(room)?.has(socket.id)
    );

    if (roomId) {
      const isCorrect = checkAnswer(code, questionId);
      if (isCorrect) {
        rooms[roomId].players[socket.id].score += 1;
        socket.emit('codeResult', { correct: true, message: 'Correct!' });

        const newQuestion = getRandomQuestion();
        rooms[roomId].currentQuestion = newQuestion;
        io.to(roomId).emit('newQuestion', {
          question: newQuestion.question,
          id: newQuestion.id
        });
      } else {
        socket.emit('codeResult', { correct: false, message: 'Wrong!' });
      }

      io.to(roomId).emit('leaderboardUpdate', rooms[roomId].players);
    } else if (players[socket.id]) {
      // Single-player (no room)
      const isCorrect = checkAnswer(code, questionId);
      if (isCorrect) {
        players[socket.id].score += 1;
        socket.emit('codeResult', { correct: true, message: 'Correct!!' });

        const newQ = getRandomQuestion();
        socket.emit('newQuestion', newQ);
      } else {
        socket.emit('codeResult', { correct: false, message: 'Wrong!' });
      }

      io.emit('leaderboardUpdate', players);
    }
  });

  // ------------------ Disconnect Logic ------------------
  socket.on('disconnect', () => {
    // Remove from global players (non-room)
    if (players[socket.id]) {
      delete players[socket.id];
      io.emit('leaderboardUpdate', players);
    }

    // Remove from rooms
    for (const roomId in rooms) {
      if (rooms[roomId].players[socket.id]) {
        delete rooms[roomId].players[socket.id];
        io.to(roomId).emit('leaderboardUpdate', rooms[roomId].players);
      }
    }

    console.log('Player disconnected:', socket.id);
  });
});

// Start Server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// const cors = require('cors');
// const { getRandomQuestion, checkAnswer } = require('./utils/codeChecker');

// const app = express();
// const server = http.createServer(app);

// app.use(cors());

// const io = socketIo(server, {
//   cors: {
//     origin: '*',
//     methods: ['GET', 'POST']
//   }
// });

// // Store players (for non-room games)
// const players = {};

// // Store rooms; now each room can also store its language.
// const rooms = {};

// io.on('connection', (socket) => {
//   console.log('Player connected:', socket.id);

//   // ------------------ Quick Join (Single Global Room Style) ------------------
//   socket.on('joinGame', (playerName) => {
//     players[socket.id] = { name: playerName, score: 0 };

//     // Using default language for single-player (e.g., Python)
//     const question = getRandomQuestion('python');
//     socket.emit('newQuestion', question);
//     io.emit('leaderboardUpdate', players);
//   });

//   // ------------------ Room-Based Multiplayer ------------------
//   socket.on('createRoom', ({ roomId, name }) => {
//     if (!rooms[roomId]) {
//       // Initialize room with a language property. It will be set on startGame.
//       rooms[roomId] = {
//         players: {},
//         currentQuestion: null,
//         language: 'python'
//       };
//     }
//     rooms[roomId].players[socket.id] = { name, score: 0 };
//     socket.join(roomId);
//     io.to(roomId).emit('leaderboardUpdate', rooms[roomId].players);
//   });

//   socket.on('joinRoom', ({ roomId, name }) => {
//     if (rooms[roomId]) {
//       rooms[roomId].players[socket.id] = { name, score: 0 };
//       socket.join(roomId);
//       io.to(roomId).emit('leaderboardUpdate', rooms[roomId].players);
//     } else {
//       socket.emit('roomNotFound');
//     }
//   });

//   // Start game now accepts the language from the client.
//   socket.on('startGame', ({ roomId, language }) => {
//     if (rooms[roomId]) {
//       // Save the room's language selection.
//       rooms[roomId].language = language;
//       const newQuestion = getRandomQuestion(language);
//       rooms[roomId].currentQuestion = newQuestion;
//       io.to(roomId).emit('newQuestion', {
//         question: newQuestion.question,
//         id: newQuestion.id
//       });
//     }
//   });

//   // ------------------ Code Submission ------------------
//   socket.on('submitCode', ({ code, questionId }) => {
//     // Find the room this player is in.
//     const roomId = Object.keys(rooms).find((room) =>
//       io.sockets.adapter.rooms.get(room)?.has(socket.id)
//     );

//     if (roomId) {
//       // Use the room's language when checking answers.
//       const language = rooms[roomId].language || 'python';
//       const isCorrect = checkAnswer(code, questionId, language);
//       if (isCorrect) {
//         rooms[roomId].players[socket.id].score += 1;
//         socket.emit('codeResult', { correct: true, message: 'Correct!' });

//         // Start new round for room with selected language.
//         const newQuestion = getRandomQuestion(language);
//         rooms[roomId].currentQuestion = newQuestion;
//         io.to(roomId).emit('newQuestion', {
//           question: newQuestion.question,
//           id: newQuestion.id
//         });
//       } else {
//         socket.emit('codeResult', { correct: false, message: 'Wrong!' });
//       }

//       io.to(roomId).emit('leaderboardUpdate', rooms[roomId].players);
//     } else if (players[socket.id]) {
//       // Single-player (non-room game)
//       const isCorrect = checkAnswer(code, questionId, 'python');
//       if (isCorrect) {
//         players[socket.id].score += 1;
//         socket.emit('codeResult', { correct: true, message: 'Correct!!' });

//         const newQ = getRandomQuestion('python');
//         socket.emit('newQuestion', newQ);
//       } else {
//         socket.emit('codeResult', { correct: false, message: 'Wrong!' });
//       }

//       io.emit('leaderboardUpdate', players);
//     }
//   });

//   // ------------------ Disconnect Logic ------------------
//   socket.on('disconnect', () => {
//     // Remove from global players (non-room)
//     if (players[socket.id]) {
//       delete players[socket.id];
//       io.emit('leaderboardUpdate', players);
//     }

//     // Remove from rooms
//     for (const roomId in rooms) {
//       if (rooms[roomId].players[socket.id]) {
//         delete rooms[roomId].players[socket.id];
//         io.to(roomId).emit('leaderboardUpdate', rooms[roomId].players);
//       }
//     }

//     console.log('Player disconnected:', socket.id);
//   });
// });

// // Start Server
// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
