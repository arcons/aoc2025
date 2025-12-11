
import { part1, part2 } from './index';
import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

const exampleInput = `7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`;

describe('Day 9', () => {
  describe('Part 1', () => {
    it('should calculate the largest area for the example', () => {
      expect(part1(exampleInput)).toBe(50);
    });

    it('should calculate part 1 answer', () => {
      const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');
      const result = part1(input);
      console.log('Part 1 Answer:', result);
    });
  });

  describe('Part 2', () => {
    it('should calculate the largest area for the example', () => {
       expect(part2(exampleInput)).toBe(24);
    });

    it('should calculate part 2 answer', () => {
      const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');
      const result = part2(input);
      console.log('Part 2 Answer:', result);
    });
  });
});

