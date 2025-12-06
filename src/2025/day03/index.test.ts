import { part1, part2, findMaxJoltage } from './index';
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

const input = readFileSync(join(__dirname, 'input.txt'), 'utf-8');

describe('Day 3', () => {
  describe('findMaxJoltage', () => {
    it('should find max joltage for example cases (k=2)', () => {
      expect(findMaxJoltage('987654321111111', 2)).toBe('98');
      expect(findMaxJoltage('811111111111119', 2)).toBe('89');
      expect(findMaxJoltage('234234234234278', 2)).toBe('78');
      expect(findMaxJoltage('818181911112111', 2)).toBe('92');
    });

    it('should find max joltage for example cases (k=12)', () => {
      expect(findMaxJoltage('987654321111111', 12)).toBe('987654321111');
      expect(findMaxJoltage('811111111111119', 12)).toBe('811111111119');
      expect(findMaxJoltage('234234234234278', 12)).toBe('434234234278');
      expect(findMaxJoltage('818181911112111', 12)).toBe('888911112111');
    });
  });

  describe('part1', () => {
    it('should solve the example input', () => {
      const example = `987654321111111\n811111111111119\n234234234234278\n818181911112111`;
      expect(part1(example)).toBe(357);
    });

    it('should solve the puzzle input', () => {
      const result = part1(input);
      console.log('Part 1 Answer:', result);
    });
  });

  describe('part2', () => {
    it('should solve the example input', () => {
      const example = `987654321111111\n811111111111119\n234234234234278\n818181911112111`;
      expect(part2(example)).toBe(3121910778619);
    });

    it('should solve the puzzle input', () => {
      const result = part2(input);
      console.log('Part 2 Answer:', result);
    });
  });
});
