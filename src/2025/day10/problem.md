# Day 10: Factory

## Part 1

We are given a list of machines. Each machine has:
1.  **Indicator Light Diagram**: A target configuration of lights (e.g., `[.##.]`), where `.` is off and `#` is on.
    - All lights start **OFF**.
    - The diagram shows the target state.
    - The number of characters in the diagram is the number of lights.
2.  **Button Wiring Schematics**: A list of buttons, each affecting a specific set of lights (e.g., `(0,3,4)`).
    - Pressing a button **toggles** the state of the listed lights (0-indexed).
    - Lights: Off -> On, On -> Off.
3.  **Joltage Requirements**: Ignored in Part 1.

**Goal**: Find the **fewest total button presses** required to reach the target light configuration for each machine, and sum these minimums across all machines.

**Constraints**:
- Buttons can be pressed any non-negative integer number of times.
- Since pressing a button twice is equivalent to not pressing it at all (modulo 2), each button is either pressed 0 or 1 time in the optimal solution.

## Part 2

The machines now need to satisfy **Joltage Requirements**.
1.  **Joltage Requirements**: A set of target counter values (e.g., `{3,5,4,7}`).
    - All counters start at **0**.
    - The number of values is the number of counters.
2.  **Button Wiring Schematics**: Same as Part 1, but now behavior is different.
    - Pressing a button **increments** the listed counters (0-indexed) by **1**.
3.  **Indicator Light Diagram**: Ignored in Part 2.

**Goal**: Find the **fewest total button presses** required to reach the target counter values for each machine, and sum these minimums across all machines.

**Constraints**:
- Buttons can be pressed any non-negative integer number of times.
- This is a system of linear equations over integers.
- We need to find non-negative integer solutions that minimize the sum of variables.

## Input Format

Each line represents a machine:
`[DIAGRAM] (BUTTON1) (BUTTON2) ... {JOLTAGE}`

Example:
`[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}`

- `[...]`: Diagram
- `(...)`: Buttons (comma-separated indices)
- `{...}`: Joltage (comma-separated values)
