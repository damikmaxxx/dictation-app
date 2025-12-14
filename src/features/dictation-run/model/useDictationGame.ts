import { useState, useEffect, useCallback } from 'react';
import { useSpeechSynthesis } from 'shared/lib'; // Наш хук звука
import { GameWord, GameAnswer } from './types';

export const useDictationGame = (words: GameWord[], language: string) => {
  // Подключаем говорилку
  const { speak, isSpeaking } = useSpeechSynthesis();

  // Состояние игры
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<GameAnswer[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const currentWord = words[currentIndex];

  useEffect(() => {
    if (currentWord && !isFinished) {
      speak(currentWord.text, language);
    }
  }, [currentIndex, currentWord, language, isFinished, speak]);

  // 2. Функция приема ответа
  const submitAnswer = useCallback((input: string) => {
    const cleanInput = input.trim().toLowerCase();
    const cleanTarget = currentWord.text.trim().toLowerCase();
    
    // Формируем ответ
    const newAnswer: GameAnswer = {
      word: currentWord.text,
      userInput: input,
      isCorrect: cleanInput === cleanTarget,
    };

    setAnswers((prev) => [...prev, newAnswer]);

    // Переключаем дальше или завершаем
    if (currentIndex < words.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  }, [currentIndex, currentWord, words.length]);

  // 3. Повтор звука (для кнопки)
  const repeatAudio = useCallback(() => {
    if (currentWord) {
      speak(currentWord.text, language);
    }
  }, [currentWord, language, speak]);

  // 4. Рестарт
  const restart = useCallback(() => {
    setAnswers([]);
    setCurrentIndex(0);
    setIsFinished(false);
  }, []);

  return {
    currentIndex,
    totalWords: words.length,
    currentWord,
    answers,
    isFinished,
    isSpeaking,
    submitAnswer,
    repeatAudio,
    restart
  };
};