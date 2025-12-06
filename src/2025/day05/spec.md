# Specification - Day 5: Cafeteria

## Core Logic: countTotalFresh(ranges: {start, end}[]): number

Input: List of ranges.
Output: Total count of unique integers covered.

Algorithm (Merge Intervals):
1. Sort ranges by `start` ascending.
2. Initialize `mergedRanges = []`.
3. Iterate through sorted ranges:
    a. If `mergedRanges` is empty, push current range.
    b. Else, compare current range with the last range in `mergedRanges`.
    c. If they overlap or touch (i.e., `current.start <= last.end + 1` - actually wait, if they touch e.g. 1-2 and 3-4, they are effectively one range 1-4 for counting purposes? No, usually distinct integers.
       - 1-2 covers {1, 2}. 3-4 covers {3, 4}. Total 4.
       - Overlap: 1-3 and 2-4. Union 1-4.
       - So if `current.start <= last.end + 1`, we *can* merge them.
       - WAIT: "overlap" strictly means sharing an integer.
       - If ranges are `3-5` (3,4,5) and `10-14` (10..14), they don't overlap.
       - If ranges are `1-2` and `3-4`, they don't overlap, but they form a contiguous block of integers.
       - For counting purposes, merging contiguous ranges is fine.
       - Condition for merging: `current.start <= last.end + 1`.
       - If true, `last.end = max(last.end, current.end)`.
       - Else, push current range.
4. After merging, sum the lengths of all ranges in `mergedRanges`.
    - Length of range `[start, end]` is `end - start + 1`.
5. Return sum.

## Parsing & Solving

Input: String.

Part 1: Same as before.
Part 2: Parse ranges, run merge algorithm, return sum.

## Test Cases

### Part 2 Example
Input:
`3-5
10-14
16-20
12-18`

Expected Result: `14`

Breakdown:
- Sorted:
  - 3-5
  - 10-14
  - 12-18
  - 16-20
- Merge:
  - Start with [3, 5].
  - Next [10, 14]. No overlap with [3, 5]. List: [[3, 5], [10, 14]].
  - Next [12, 18]. Overlaps with [10, 14] (12 <= 14 + 1). New end max(14, 18) = 18. List: [[3, 5], [10, 18]].
  - Next [16, 20]. Overlaps with [10, 18] (16 <= 18 + 1). New end max(18, 20) = 20. List: [[3, 5], [10, 20]].
- Lengths:
  - 3-5: 5 - 3 + 1 = 3.
  - 10-20: 20 - 10 + 1 = 11.
- Total: 3 + 11 = 14.

