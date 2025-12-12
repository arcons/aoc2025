import { describe, it, expect } from 'vitest';
import { part1, part2 } from './index';
import fs from 'fs';
import path from 'path';

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');

describe('Day 11', () => {
  describe('Part 1', () => {
    it('should solve the example', () => {
      const example = `aaa: you hhh
you: bbb ccc
bbb: ddd eee
ccc: ddd eee fff
ddd: ggg
eee: out
fff: out
ggg: out
hhh: ccc fff iii
iii: out`;
      expect(part1(example)).toBe(5);
    });

    it('should solve the puzzle input', () => {
      const result = part1(input);
      console.log('Part 1 Result:', result);
    });
  });

  describe('Part 2', () => {
    it('should solve the part 2 example', () => {
      const example = `svr: aaa bbb
aaa: fft
fft: ccc
bbb: tty
tty: ccc
ccc: ddd eee
ddd: hub
hub: fff
eee: dac
dac: fff
fff: ggg hhh
ggg: out
hhh: out`;
      expect(part2(example)).toBe(2);
    });

    it('should solve the part 2 input', () => {
      const result = part2(input);
      console.log('Part 2 Result:', result);
    });
  });
});
