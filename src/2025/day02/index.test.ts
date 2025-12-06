import { part1, part2, isInvalidID, isInvalidIDPart2 } from './index';
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

const input = readFileSync(join(__dirname, 'input.txt'), 'utf-8');

describe('Day 2', () => {
  describe('isInvalidID', () => {
    it('should correctly identify invalid IDs', () => {
      expect(isInvalidID(55)).toBe(true);
      expect(isInvalidID(6464)).toBe(true);
      expect(isInvalidID(123123)).toBe(true);
      expect(isInvalidID(11)).toBe(true);
      expect(isInvalidID(22)).toBe(true);
      expect(isInvalidID(99)).toBe(true);
      expect(isInvalidID(1010)).toBe(true);
    });

    it('should correctly identify valid IDs (non-invalid)', () => {
      expect(isInvalidID(101)).toBe(false);
      expect(isInvalidID(123124)).toBe(false);
    });
  });

  describe('isInvalidIDPart2', () => {
    it('should correctly identify invalid IDs for Part 2', () => {
      expect(isInvalidIDPart2(12341234)).toBe(true);
      expect(isInvalidIDPart2(123123123)).toBe(true);
      expect(isInvalidIDPart2(1212121212)).toBe(true);
      expect(isInvalidIDPart2(1111111)).toBe(true);
      expect(isInvalidIDPart2(99)).toBe(true);
      expect(isInvalidIDPart2(111)).toBe(true);
      expect(isInvalidIDPart2(999)).toBe(true);
    });

    it('should correctly identify valid IDs for Part 2', () => {
      expect(isInvalidIDPart2(123124)).toBe(false);
      expect(isInvalidIDPart2(101)).toBe(false);
    });
  });

  describe('part1', () => {
    it('should solve the example input', () => {
      const example = '11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124';
      expect(part1(example)).toBe(1227775554);
    });

    it('should solve the puzzle input', () => {
      const result = part1(input);
      console.log('Part 1 Answer:', result);
    });
  });

  describe('part2', () => {
    it('should solve the example input', () => {
      const example = '11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124';
      expect(part2(example)).toBe(4174379265);
    });

    it('should solve the puzzle input', () => {
      const result = part2(input);
      console.log('Part 2 Answer:', result);
    });
  });
});
