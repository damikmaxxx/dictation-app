
export interface GameWord {
  text: string;
  audioUrl?: string; 
}

export interface GameAnswer {
  word: string;        
  userInput: string;   
  isCorrect: boolean;  
}