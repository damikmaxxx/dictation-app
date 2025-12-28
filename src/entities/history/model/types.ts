
export interface HistoryError {
  word: string;
  userInput: string;
}

export interface SaveHistoryDto {
  dictationId: number;
  score: number;       
  totalWords: number;
  correctCount: number;
  errors?: HistoryError[];
}

export interface HistoryItem {
  id: number;
  score: number;
  correctCount: number;
  totalWords: number;
  createdAt: string;
  dictation: {
    id: number;      
    title: string;
    language: string;
  };
}