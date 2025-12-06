# Specification - Day 6: Trash Compactor

## Core Logic: parseAndSolve(input: string, part: 1 | 2): number

Input: String grid, and part number.
Output: Integer total.

Algorithm (Common Parsing):
1. Split the input into `lines`.
2. Determine `maxLength` of all lines to ensure a rectangular grid.
3. Pad all lines with spaces to `maxLength`.

## Problem Identification and Solving

### `getProblemBlocks(paddedLines: string[]): string[][]`
This function identifies and extracts individual problem blocks from the padded grid.
- Iterate through columns from left to right.
- A column is considered "empty" if all characters in that column are spaces.
- Group contiguous non-empty columns into a "problem block".
- Each problem block is returned as an array of strings, where each string is a slice of the original padded lines corresponding to the columns of that block.

### `solveBlockPart1(block: string[]): number` (Used by part1)
Input: An array of strings representing a single problem block.
Output: The result of the problem.

Algorithm:
1. Identify operator: The single non-space character in the last non-empty line of the `block`.
2. Extract numbers:
   - For each line *before* the operator line:
     - Trim the line, parse any numbers found, and add to a list. (Numbers are horizontal in lines).
     - The example implies numbers are whole entities per row. e.g. "123" is one number, not "1", "2", "3".
     - So, for each line in the block (excluding the operator line), `line.trim()` and `parseInt()`.
3. Apply operator:
   - If `*`, compute product of numbers.
   - If `+`, compute sum of numbers.

### `solveBlockPart2(block: string[]): number` (Used by part2)
Input: An array of strings representing a single problem block.
Output: The result of the problem.

Algorithm:
1. Identify operator: The single non-space character in the last non-empty line of the `block`.
2. Extract numbers:
   - Determine `blockWidth = block[0].length`.
   - Determine `blockHeight = block.length`.
   - Find `operatorRow`: the index of the line containing the operator.
   - For each column `c` from `0` to `blockWidth - 1`:
     - Construct a string by concatenating `block[row][c]` for `row` from `0` to `operatorRow - 1`.
     - Trim this string (e.g., `    4` -> `4`).
     - Parse the trimmed string as an integer. If non-empty after trim and valid number, add to a list of numbers.
3. Apply operator:
   - If `*`, compute product of numbers.
   - If `+`, compute sum of numbers.

## Main Function `part1(input: string)` and `part2(input: string)`:
1. Call `getProblemBlocks`.
2. Iterate each block and call `solveBlockPart1` or `solveBlockPart2` respectively.
3. Sum results.

## Test Cases

### Part 1 Example
Input:
```
123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  
```
Expected Result: `4277556`

### Part 2 Example
Input:
```
123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  
```
Expected Result: `3263827`

