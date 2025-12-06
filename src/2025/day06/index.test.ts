import { part1, part2 } from './index';
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

const input = readFileSync(join(__dirname, 'input.txt'), 'utf-8');

describe('Day 6', () => {
  describe('part1', () => {
    it('should solve the example input', () => {
      const example = `123 328  51 64 \n 45 64  387 23 \n  6 98  215 314\n*   +   *   +  `;
      expect(part1(example)).toBe(4277556);
    });

    it('should solve the puzzle input', () => {
      const result = part1(input);
      console.log('Part 1 Answer:', result);
    });
  });

  describe('part2', () => {
    it('should solve the example input', () => {
      const example = `123 328  51 64 \n 45 64  387 23 \n  6 98  215 314\n*   +   *   +  `;
      expect(part2(example)).toBe(3263827);
    });

    it('should solve the puzzle input', () => {
      const result = part2(input);
      console.log('Part 2 Answer:', result);
    });
  });
});
