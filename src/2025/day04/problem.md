# Day 4: Printing Department

## Problem Description

We are given a grid of paper rolls (`@`) and empty spaces (`.`).
A paper roll is accessible (and removable) if it has **< 4 neighbors** that are also paper rolls (`@`).

Part 1: Count how many rolls are initially accessible.
Part 2: Simulate the process of removing accessible rolls iteratively.
- In each step, identify all rolls that are currently accessible.
- Remove them (turn them into `.`).
- Repeat until no more rolls can be removed.
- Return the total count of removed rolls.

## Input

- Grid of `@` and `.`.

## Output

- Part 1: Initial accessible count.
- Part 2: Total removed count after stabilization.

