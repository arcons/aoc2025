import { part1, part2 } from './index';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { describe, it, expect } from 'vitest';

const input = readFileSync(resolve(__dirname, './input.txt'), 'utf8');

describe('Day 1', () => {
  describe('Part 1', () => {
    it('should solve the example', () => {
      const example = `
L68
L30
R48
L5
R60
L55
L1
L99
R14
L82
      `.trim();
      expect(part1(example)).toBe(3);
    });

    it('should solve the puzzle', () => {
      expect(part1(input)).toBe(1081);
    });
  });

  describe('Part 2', () => {
    it('should solve the example', () => {
      const example = `
// example input here
      `.trim();
      expect(part2(example)).toBe(0);
    });

    it('should solve the puzzle', () => {
      // The expected value here is unknown until the code is run
      expect(part2(input)).toBe(0);
    });
  });
});
