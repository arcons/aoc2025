# Day 2: Gift Shop

## Problem Description

We are given a list of ID ranges (e.g., `11-22`, `95-115`).
We need to identify "invalid IDs" within these ranges and calculate their sum.

### Part 1
An **Invalid ID** is defined as a number whose string representation consists of a sequence of digits repeated **exactly twice**.
- Examples: `55` (5-5), `6464` (64-64), `123123` (123-123).
- Non-examples: `101` (odd length), `123124` (halves differ).

### Part 2
An **Invalid ID** is defined as a number whose string representation consists of a sequence of digits repeated **at least twice**.
- Examples: 
  - `12341234` (repeated 2 times)
  - `123123123` (repeated 3 times)
  - `1212121212` (repeated 5 times)
  - `1111111` (repeated 7 times)

Constraints:
- No leading zeros.

## Input

- A single line containing comma-separated ranges.
- Each range is `start-end` (inclusive).

## Output

- The sum of all invalid IDs found within the given ranges.

