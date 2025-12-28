import React, { useEffect } from 'react';
import { useDictationGame } from '../model/useDictationGame';
import { GameScreen } from './GameScreen/GameScreen';
import { ResultScreen } from './ResultScreen/ResultScreen';
import { DictationWordDto } from 'entities/dictation';
import { useSaveResultMutation } from 'entities/history'; 

interface DictationSessionProps {
  dictationId: number; 
  words: DictationWordDto[];
  language: string;
  onFinish?: (score: number) => void;
}

export const DictationSession: React.FC<DictationSessionProps> = ({ 
  dictationId, 
  words, 
  language, 
  onFinish 
}) => {
  const {
    currentIndex,
    totalWords,
    isSpeaking,
    isFinished,
    answers,
    submitAnswer,
    repeatAudio,
    restart
  } = useDictationGame(words, language);

  const [saveResult] = useSaveResultMutation();

  useEffect(() => {
    if (isFinished) {
      const correctCount = answers.filter(a => a.isCorrect).length;
      const score = totalWords > 0 ? Math.round((correctCount / totalWords) * 100) : 0;
      
      const errors = answers
        .filter(a => !a.isCorrect)
        .map(a => ({ word: a.word, userInput: a.userInput }));

      saveResult({
        dictationId,
        score,
        totalWords,
        correctCount,
        errors
      })
      .unwrap()
      .then(() => console.log('✅ Результат сохранен!'))
      .catch((err) => console.error('❌ Ошибка сохранения:', err));
    }
  }, [isFinished]); 

  if (isFinished) {
    const correctCount = answers.filter(a => a.isCorrect).length;
    const score = totalWords > 0 ? Math.round((correctCount / totalWords) * 100) : 0;

    return (
      <ResultScreen 
        answers={answers} 
        onRetry={restart} 
        onBack={() => {
          if (onFinish) onFinish(score);
        }} 
      />
    );
  }

  return (
    <GameScreen 
      currentIndex={currentIndex}
      totalWords={totalWords}
      isSpeaking={isSpeaking}
      onRepeat={repeatAudio}
      onSubmit={submitAnswer}
    />
  );
};