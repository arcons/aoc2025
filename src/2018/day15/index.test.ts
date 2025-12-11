import { describe, it, expect } from 'vitest';
import { part1, part2 } from './index';
import fs from 'fs';
import path from 'path';

describe('Day 15', () => {
  describe('Part 1', () => {
    it('Case 1', () => {
      const input = `#######
#.G...#
#...EG#
#.#.#G#
#..G#E#
#.....#
#######`;
      expect(part1(input)).toBe(27730);
    });

    it('Case 2', () => {
      const input = `#######
#G..#E#
#E#E.E#
#G.##.#
#...#E#
#...E.#
#######`;
      expect(part1(input)).toBe(36334);
    });

    it('Case 3', () => {
      const input = `#######
#E..EG#
#.#G.E#
#E.##E#
#G..#.#
#..E#.#
#######`;
      expect(part1(input)).toBe(39514);
    });

    it('Case 4', () => {
      const input = `#######
#E.G#.#
#.#G..#
#G.#.G#
#G..#.#
#...E.#
#######`;
      expect(part1(input)).toBe(27755);
    });
  });

  describe('Part 2', () => {
    it('Case 1 (P1 Case 1)', () => {
      const input = `#######
#.G...#
#...EG#
#.#.#G#
#..G#E#
#.....#
#######`;
      expect(part2(input)).toBe(4988);
    });

    it('Case 2 (P1 Case 3)', () => {
      const input = `#######
#E..EG#
#.#G.E#
#E.##E#
#G..#.#
#..E#.#
#######`;
      expect(part2(input)).toBe(31284);
    });

    it('Case 3 (P1 Case 4)', () => {
      const input = `#######
#E.G#.#
#.#G..#
#G.#.G#
#G..#.#
#...E.#
#######`;
      expect(part2(input)).toBe(3478);
    });

    it('Case 4 (Extra 1)', () => {
      const input = `#######
#.E...#
#.#..G#
#.###.#
#E#G#G#
#...#G#
#######`;
      expect(part2(input)).toBe(6474);
    });

    it('Case 5 (Extra 2)', () => {
      const input = `#########
#G......#
#.E.#...#
#..##..G#
#...##..#
#...#...#
#.G...G.#
#.....G.#
#########`;
      expect(part2(input)).toBe(1140);
    });
  });

  it('Real Input', () => {
    const realInput = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');
    console.log('ANSWER PART 1:', part1(realInput));
    console.log('ANSWER PART 2:', part2(realInput));
  });
});
