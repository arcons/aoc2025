# Advent of Code 2025 - Spec Driven Development

This document outlines the spec-driven workflow for solving the Advent of Code 2025 puzzles.

## Workflow per Day

For each day of Advent of Code, the following steps will be taken:

### 1. Problem Definition

- **Action:** Fetch the puzzle description for the given day.
- **Source:** `https://adventofcode.com/2025/day/{day}`
- **Output:** Create a `spec.md` file in the `src/2025/day{day}` directory containing the puzzle description.

### 2. Test Case Generation

- **Action:** Parse the `spec.md` to identify example inputs and their corresponding expected outputs.
- **Input:** `src/2025/day{day}/spec.md`
- **Output:** Update `src/2025/day{day}/index.test.ts` with `vitest` test cases based on the examples.

### 3. Input Acquisition

- **Action:** Fetch the official puzzle input for the given day.
- **Source:** `https://adventofcode.com/2025/day/{day}/input`
- **Output:** Save the puzzle input to `src/2025/day{day}/input.txt`.

### 4. Solution Implementation

- **Action:** Implement the solution logic in TypeScript. The implementation should be guided by the `spec.md` and verified against the test cases.
- **Input:** 
    - `src/2025/day{day}/spec.md`
    - `src/2025/day{day}/index.test.ts`
    - `src/2025/day{day}/input.txt`
- **Output:** A passing test suite, with the correct implementation in `src/2025/day{day}/index.ts`.

### 5. Submission

- **Action:** Once the solution is implemented and tested, submit the answer.
- **Endpoint:** `https://adventofcode.com/2025/day/{day}/answer`
- **Method:** HTTP POST request.
- **Body:** The calculated answer for the puzzle.