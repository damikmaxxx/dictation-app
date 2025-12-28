
const PATTERNS: Record<string, RegExp> = {
  ru: /^[а-яё\s\-]+$/i, 
  en: /^[a-z\s'\-]+$/i, 
  de: /^[a-zäöüß\s\-]+$/i, 
};

export const findInvalidWords = (words: string[], lang: string): string[] => {
  const pattern = PATTERNS[lang];
  if (!pattern) return []; 
  return words.filter((word) => !pattern.test(word));
};