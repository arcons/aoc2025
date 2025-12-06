# Day 1: Secret Entrance

## Problem Summary

The safe to the secret entrance is a decoy. The actual password is the number of times the safe's dial points to 0 after a sequence of rotations.

## Rules

* The dial has numbers from 0 to 99.
* The dial starts at position 50.
* Rotations are given as a sequence of instructions, one per line.
* Each instruction is a character (`L` or `R`) followed by a number.
    * `L` means rotate left (counter-clockwise).
    * `R` means rotate right (clockwise).
* The dial is circular:
    * Rotating left from 0 moves to 99.
    * Rotating right from 99 moves to 0.

## Goal

The password is the number of times the dial points to 0 after any rotation in the sequence.

## Example

Given the following rotations:

```
L68
L30
R48
L5
R60
L55
L1
L99
R14
L82
```

The dial moves as follows:

*   Starts at `50`.
*   `L68` -> `82`
*   `L30` -> `52`
*   `R48` -> `0` (1st time at 0)
*   `L5` -> `95`
*   `R60` -> `55`
*   `L55` -> `0` (2nd time at 0)
*   `L1` -> `99`
*   `L99` -> `0` (3rd time at 0)
*   `R14` -> `14`
*   `L82` -> `32`

In this example, the dial points to 0 three times, so the password is `3`.
