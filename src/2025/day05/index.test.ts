import { part1, part2 } from './index';
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

const input = readFileSync(join(__dirname, 'input.txt'), 'utf-8');

describe('Day 5', () => {
  describe('part1', () => {
    it('should solve the example input', () => {
      const example = `3-5\n10-14\n16-20\n12-18\n\n1\n5\n8\n11\n17\n32`;
      expect(part1(example)).toBe(3);
    });

    it('should solve the puzzle input', () => {
      const result = part1(input);
      console.log('Part 1 Answer:', result);
    });
  });

  describe('part2', () => {
    it('should solve the example input', () => {
      const example = `3-5\n10-14\n16-20\n12-18\n\n1\n5\n8\n11\n17\n32`;
      expect(part2(example)).toBe(14);
    });

    it('should solve the puzzle input', () => {
      const result = part2(input);
      console.log('Part 2 Answer:', result);
    });
  });
});
