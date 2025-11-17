// import { Component, OnInit } from '@angular/core';
// import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
// import { io } from 'socket.io-client';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// @Component({
//   selector: 'app-code-game',
//   standalone: true,
//   imports: [FormsModule,CommonModule,DragDropModule],
//   templateUrl: './code-game.component.html',
//   styleUrl: './code-game.component.css'
// })
// export class CodeGameComponen implements OnInit {
//   questionId=''
//   codeBlocks:string[]=[]
//  leaderboard: { [socketId: string]: { name: string; score: number } } = {};

//   socket=io('');

//   timer=30;
//   intervalId:any
//   roundActive:boolean=false

//   playerName=''
//   joined=false

// ngOnInit(): void {
//   this.socket=io('http://localhost:3000');

//   this.socket.on('newQuestion',(data)=>{
//   this.codeBlocks=data.question;
//   this.questionId=data.id;
//   this.startRound()
//   });

//   this.socket.on('codeResult',(data)=>{
//         alert(data.message)
//       })

//       this.socket.on('leaderboardUpdate',(data)=>{
//       this.leaderboard=data
//       })

//   }

//     startRound(){
//       this.roundActive=true
//         this.intervalId=setInterval(()=>{
//           this.timer--;
//           if(this.timer===0){
//             clearInterval(this.intervalId);
//             this.roundActive=false;
//             alert("TIMES UP!!")
//           }
//         },1000)
//     }

//     drop(event:CdkDragDrop<string[]>){
//       moveItemInArray(this.codeBlocks,event.previousIndex,event.currentIndex);
//     }


//     submitCode(){

//       if (!this.roundActive) {
//     alert("⛔ Round over!");
//     return;
//   }
//       const joinedcode=this.codeBlocks.join(' ');
//       this.socket.emit('submitCode',{
//         code:joinedcode,
//         questionId:this.questionId}
//       );

      

//       this.socket.on('winner',(data)=>{
//         console.log("winner is",data.id);
//       })

//       clearInterval(this.intervalId);
//       this.roundActive = false;
//     }

//     joinGame(){
//       if(!this.playerName.trim()){
//         alert("Please enter your Name");
//         return;
//       }
//       this.socket.emit('joinGame',this.playerName);
//       this.joined=true;
//     }

// }


//add room match
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { io, Socket } from 'socket.io-client';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-code-game',
  standalone: true,
  imports: [FormsModule, CommonModule, DragDropModule],
  templateUrl: './code-game.component.html',
  styleUrls: ['./code-game.component.css']
})
export class CodeGameComponent implements OnInit {
  questionId = '';
  codeBlocks: string[] = [];
  leaderboard: { [socketId: string]: { name: string; score: number } } = {};

  socket: Socket = io('https://code-scramble-node.onrender.com');

  timer = 30;
  intervalId: any;
  roundActive: boolean = false;

  playerName = '';
  joined = false;

  roomId: string = '';
  roomCreatedMessage = '';

 answers = '';
answerStatus: 'correct' | 'wrong' | '' = '';


  ngOnInit(): void {
    this.socket.on('newQuestion', (data) => {
    this.codeBlocks = data.question;
      this.questionId = data.id;
    
      this.startRound();
    });

    this.socket.on('codeResult', (data) => {
      this.answerStatus=data.message
       this.answers = data.message;
    this.answerStatus = data.success ? 'correct' : 'wrong';
      // alert(data.message);

    });

    this.socket.on('leaderboardUpdate', (data) => {
      this.leaderboard = data;
      
    });

    this.socket.on('winner', (data) => {
      console.log("🏆 Winner is", data.id);
    });
  }

  createRoom() {
    if (!this.playerName.trim()) {
      alert("Please enter your name");
      return;
    }
    if (!this.roomId.trim()) {
      this.roomId = Math.random().toString(36).substring(2, 8).toUpperCase();
    }
    this.socket.emit('createRoom', { roomId: this.roomId, name: this.playerName });
    this.joined = true;
    this.roomCreatedMessage = `Room created: ${this.roomId}`;
  }

  joinRoom() {
    if (!this.playerName.trim() || !this.roomId.trim()) {
      alert("Please enter your name and room ID");
      return;
    }
    this.socket.emit('joinRoom', { roomId: this.roomId, name: this.playerName });
    this.joined = true;
  }

  startGame() {
    this.socket.emit('startGame', { roomId: this.roomId });
  }

 startRound() {
  clearInterval(this.intervalId); // Stop previous round’s timer
  this.answers = '';
  this.answerStatus = '';
  this.roundActive = true;
  this.timer = 30;

  this.intervalId = setInterval(() => {
    if (this.timer > 0) {
      this.timer--;
    } else {
      clearInterval(this.intervalId);
      this.roundActive = false;
    }
  }, 1000);
}


  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.codeBlocks, event.previousIndex, event.currentIndex);
  }

  submitCode() {
    if (!this.roundActive) {
      alert("⛔ Round over!");
      return; 
    }

    const joinedCode = this.codeBlocks.join(' ');
    this.socket.emit('submitCode', {
      code: joinedCode,
      questionId: this.questionId,
    });

    clearInterval(this.intervalId);
    this.roundActive = false;
  }

   get sortedLeaderboard() {
    return Object.values(this.leaderboard).sort((a, b) => b.score - a.score);
  }
}

//multiple language support
// import { Component, OnInit } from '@angular/core';
// import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
// import { io, Socket } from 'socket.io-client';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-code-game',
//   standalone: true,
//   imports: [FormsModule, CommonModule, DragDropModule],
//   templateUrl: './code-game.component.html',
//   styleUrls: ['./code-game.component.css']
// })
// export class CodeGameComponent implements OnInit {
//   questionId = '';
//   codeBlocks: string[] = [];
//   leaderboard: { [socketId: string]: { name: string; score: number } } = {};

//   // socket: Socket = io('https://code-scramble-node.onrender.com');
//   socket: Socket = io('http://localhost:3000');

//   timer = 30;
//   intervalId: any;
//   roundActive: boolean = false;

//   playerName = '';
//   joined = false;

//   roomId: string = '';
//   roomCreatedMessage = '';

//   // New property for language. Default can be "python".
//   selectedLanguage: string = 'python';
//   // Options for languages can be updated as needed.
//   languageOptions = ['python', 'c', 'java'];

//   answers = '';
//   answerStatus: 'correct' | 'wrong' | '' = '';

//   ngOnInit(): void {
//     this.socket.on('newQuestion', (data) => {
//       this.codeBlocks = data.question;
//       this.questionId = data.id;    
//       this.startRound();
//     });

//     this.socket.on('codeResult', (data) => {
//       this.answers = data.message;
//       this.answerStatus = data.success ? 'correct' : 'wrong';
//     });

//     this.socket.on('leaderboardUpdate', (data) => {
//       this.leaderboard = data;      
//     });

//     this.socket.on('winner', (data) => {
//       console.log("🏆 Winner is", data.id);
//     });
//   }

//   createRoom() {
//     if (!this.playerName.trim()) {
//       alert("Please enter your name");
//       return;
//     }
//     if (!this.roomId.trim()) {
//       this.roomId = Math.random().toString(36).substring(2, 8).toUpperCase();
//     }
//     this.socket.emit('createRoom', { roomId: this.roomId, name: this.playerName });
//     this.joined = true;
//     this.roomCreatedMessage = `Room created: ${this.roomId}`;
//   }

//   joinRoom() {
//     if (!this.playerName.trim() || !this.roomId.trim()) {
//       alert("Please enter your name and room ID");
//       return;
//     }
//     this.socket.emit('joinRoom', { roomId: this.roomId, name: this.playerName });
//     this.joined = true;
//   }

//   // Pass the selectedLanguage along with roomId when starting the game
//   startGame() {
//     this.socket.emit('startGame', { roomId: this.roomId, language: this.selectedLanguage });
//   }

//   startRound() {
//     clearInterval(this.intervalId); // Stop previous round’s timer
//     this.answers = '';
//     this.answerStatus = '';
//     this.roundActive = true;
//     this.timer = 30;

//     this.intervalId = setInterval(() => {
//       if (this.timer > 0) {
//         this.timer--;
//       } else {
//         clearInterval(this.intervalId);
//         this.roundActive = false;
//       }
//     }, 1000);
//   }

//   drop(event: CdkDragDrop<string[]>) {
//     moveItemInArray(this.codeBlocks, event.previousIndex, event.currentIndex);
//   }

//   submitCode() {
//     if (!this.roundActive) {
//       alert("⛔ Round over!");
//       return; 
//     }

//     const joinedCode = this.codeBlocks.join(' ');
//     this.socket.emit('submitCode', {
//       code: joinedCode,
//       questionId: this.questionId,
//     });

//     clearInterval(this.intervalId);
//     this.roundActive = false;
//   }

//   get sortedLeaderboard() {
//     return Object.values(this.leaderboard).sort((a, b) => b.score - a.score);
//   }
// }
