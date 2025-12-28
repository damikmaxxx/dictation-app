import { parseWords } from './parseWords';

describe('parseWords utility', () => {
  it('should split simple comma-separated string', () => {
    const result = parseWords('apple,banana,orange');
    expect(result).toEqual(['apple', 'banana', 'orange']);
  });

  it('should trim spaces around words', () => {
    const result = parseWords('  apple  ,  banana  ');
    expect(result).toEqual(['apple', 'banana']);
  });

  it('should ignore empty entries caused by multiple commas', () => {
    const result = parseWords('apple,,banana,,,orange');
    expect(result).toEqual(['apple', 'banana', 'orange']);
  });

  it('should return empty array for empty string or null', () => {
    expect(parseWords('')).toEqual([]);
    expect(parseWords(null)).toEqual([]);
  });
});