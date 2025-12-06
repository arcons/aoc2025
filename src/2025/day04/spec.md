# Specification - Day 4: Printing Department

## Core Logic: Part 2 Simulation

State: Mutable grid.
Process:
1. Loop until no changes occur in a pass.
2. In each pass:
   - Identify all cells `(r, c)` that are `@` AND have `< 4` neighbors that are `@`.
   - IMPORTANT: The condition uses the grid state *at the start of the pass*? Or dynamic?
   - The problem says: "Once a roll of paper is removed, the forklifts might be able to access *more* rolls... if they keep repeating this process."
   - This usually implies distinct steps. "Starting with the same example... here is one way you could remove..."
   - The example shows "Remove 13 rolls... Remove 12 rolls..."
   - This implies a synchronous update: Identify ALL removable rolls based on current state, then remove them ALL at once.

Algorithm:
1. Initialize `totalRemoved = 0`.
2. Parse grid into mutable 2D array.
3. Loop:
    a. Let `toRemove = []`.
    b. Iterate all `(r, c)`.
    c. If `grid[r][c] === '@'` and `countNeighbors(grid, r, c) < 4`:
        - Add `(r, c)` to `toRemove`.
    d. If `toRemove.length === 0`, break loop.
    e. For each `(r, c)` in `toRemove`:
        - Set `grid[r][c] = '.'`.
    f. `totalRemoved += toRemove.length`.
4. Return `totalRemoved`.

## Helper: countNeighbors(grid, r, c)
Same as Part 1.

## Test Cases

### Part 2 Example
Input:
`..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`

Expected Result: `43`

Breakdown:
- Pass 1: Remove 13.
- Pass 2: Remove 12.
- ...
- Total: 43.

