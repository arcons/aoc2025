# Advent of Code 2025 - Spec Driven Development

This document outlines the spec-driven workflow for solving the Advent of Code 2025 puzzles.

## Authentication

To make authenticated requests to the Advent of Code API, you need to provide your session cookie. This is stored in a `.env` file at the root of the project.

- **File:** `.env`
- **Variable:** `AOC_SESSION_COOKIE`

This file is excluded from version control by `.gitignore` to keep your session cookie private.

## Workflow per Day

The workflow for solving each day's puzzle is as follows:

### 1. Automated Setup

Start by running the `fetch-day` script. This will create the day's directory and fetch the raw puzzle description and your input file, as well as stub files for the solution and tests.

```bash
npm run fetch-day {day}
```

This creates:
- `src/2025/day{dd}/description.md`: The raw puzzle description from the Advent of Code website.
- `src/2025/day{dd}/input.txt`: Your personal puzzle input.
- `src/2025/day{dd}/index.ts`: A stub file for your solution.
- `src/2025/day{dd}/index.test.ts`: A stub file for your tests.

### 2. Problem Understanding

The `description.md` file contains the raw HTML from the Advent of Code website. To make it more manageable, create a `problem.md` file. In this file, distill the description into a clear and concise explanation of the puzzle's requirements.

### 3. Spec Definition

From your understanding in `problem.md`, create a `spec.md` file. This file will define the technical specifications for the solution. It should include:

- A clear definition of the inputs.
- The expected outputs for given inputs.
- Any edge cases or constraints.
- The examples from the puzzle description, formatted as test cases.

### 4. Test Implementation

Based on the `spec.md`, implement the test cases in `src/2025/day{dd}/index.test.ts`. Use the examples from the spec to create a solid test suite.

### 5. Solution Implementation

With the tests in place, implement your solution in `src/2025/day{dd}/index.ts`. The goal is to make all the tests pass.

### 6. Submission & Part 2

The puzzles are split into two parts. You must submit the correct answer for Part 1 to unlock Part 2.

#### Submitting Your Answer

Once you have a solution, you can submit it using the `submit` script:

```bash
npm run submit {year} {day} {part} {answer}
```

- `{year}`: The year of the puzzle (e.g., 2025).
- `{day}`: The day of the puzzle.
- `{part}`: The part you are solving (1 or 2).
- `{answer}`: Your calculated answer.

For example, to submit the answer `12345` for Day 1, Part 1:

```bash
npm run submit 2025 1 1 12345
```

#### Unlocking Part 2

After a successful submission for Part 1, re-run the `fetch-day` script for the same day to get the updated puzzle description for Part 2.

```bash
npm run fetch-day {day}
```

This will overwrite `description.md` with the new content, which includes the instructions for Part 2. You can then repeat the development process:

- Update `problem.md` and `spec.md` for Part 2.
- Add new tests for Part 2 in `index.test.ts`.
- Implement the Part 2 solution.
- Submit the final answer for Part 2.



## Automated Daily Setup

For each day of Advent of Code, you can use the `fetch-day` script to automatically set up the directory, fetch the puzzle description, and download your personal input file.

### Setup

Before running the script, ensure you have your Advent of Code session cookie set up in a `.env` file at the root of the project.

- **File:** `.env`
- **Variable:** `AOC_SESSION_COOKIE`

Example:
```
AOC_SESSION_COOKIE=your_session_cookie_here
```

This file is already in `.gitignore` to protect your session cookie.

### Usage

To fetch a specific day, run the following command, replacing `{day}` with the desired day number:

```bash
npm run fetch-day {day}
```

For example, to fetch Day 1:

```bash
npm run fetch-day 1
```

The script will perform the following actions:

1.  **Create Directory:** Creates a new directory `src/2025/day{dd}` (e.g., `src/2025/day01`).
2.  **Fetch Description:** Fetches the puzzle description and creates a `description.md` file.
3.  **Fetch Input:** Fetches your personal puzzle input and creates an `input.txt` file.
4.  **Create Stubs:** Creates `index.ts` with placeholder functions for `part1` and `part2`.
5.  **Create Tests:** Creates `index.test.ts` with a basic test structure for `vitest`.