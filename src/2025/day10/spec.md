# Day 10 Spec

## Input
Lines describing machines.
Format: `[TARGET] (BTN) (BTN)... {JOLTAGE}`

## Logic
1. Parse each line.
   - Target string to vector b.
   - Button lists to matrix columns A.
2. Solve Ax = b over GF(2).
3. If multiple solutions, find min weight.
4. Sum min weights.

## Examples
See description.

