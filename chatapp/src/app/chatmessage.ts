// export interface ChatMessage {
//     sender: string;
//     content: string;
//   }
  export interface ChatMessage {
  sender: string;
  content: string;
  type?: 'CHAT' | 'TYPING'; 
}
