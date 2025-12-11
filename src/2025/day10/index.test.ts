import { part1, part2 } from './index';
import { describe, expect, test } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

const input = `[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}
[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}`;

describe('Day 10', () => {
  describe('Part 1', () => {
    test('Example', () => {
      expect(part1(input)).toBe(7);
    });
  });

  describe('Part 2', () => {
    test('Example', () => {
      expect(part2(input)).toBe(33);
    });
  });

  describe('Real Input', () => {
     test('Part 1 Answer', () => {
       const realInput = fs.readFileSync(path.join(process.cwd(), 'src/2025/day10/input.txt'), 'utf-8');
       expect(part1(realInput)).toBe(571);
     });

     test('Part 2 Answer', () => {
        const realInput = fs.readFileSync(path.join(process.cwd(), 'src/2025/day10/input.txt'), 'utf-8');
        console.log('PART 2 ANSWER:', part2(realInput));
     });
  });
});
