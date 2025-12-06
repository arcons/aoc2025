# Specification - Day 3: Lobby

## Core Logic: findMaxJoltage(bank: string, k: number): string

Generalize the logic to pick `k` digits.
Input: A string of digits and `k` (number of digits to pick).
Output: The largest k-digit number (as a string, since 12 digits fits in JS number (safe integer is 15-16 digits), but let's be safe or just use number if safe. 12 digits max is 999...9 (12 times) < 2^53, so strictly JS number is fine. However, string is easier for logic).

Algorithm (Greedy):
To form the largest number of length `k`:
1. We need to pick the first digit such that we can still pick `k-1` digits from the remaining string.
2. The first digit should be the largest possible digit available in the valid range.
   - Valid range for the first digit: from index `0` to `bank.length - k`.
   - Why? If we pick a digit at index `bank.length - k + 1`, we only have `k - 2` digits left, which is not enough.
3. Once we pick the largest digit in the valid range (say at index `i`), we append it to our result.
4. Then we recurse/iterate for the remaining `k-1` digits using the substring starting from `i + 1`.

Detailed Step-by-Step:
1. Let `result = ""`.
2. Let `startIndex = 0`.
3. Loop `count` from `k` down to 1:
    a. The search window for the next digit is from `startIndex` to `bank.length - count`.
    b. Find the largest digit in this window. If multiple, pick the *first* occurrence (to leave as much room as possible for subsequent digits? Actually, does it matter?
       - Example: `919...`, pick 2.
       - Range covers both 9s.
       - If we pick first 9, we have `19...` left.
       - If we pick second 9, we have `...` left.
       - We prefer the first occurrence to maximize the remaining string length, giving us more options for the next steps?
       - Wait, actually, for the *next* step, we want the largest digit. Having a longer string *might* help find a larger digit earlier, or it might not. But strictly, picking the first occurrence of the max digit is always safe or better because the set of available digits after the first occurrence is a superset of the set of digits after the second occurrence.
       - So yes, pick the first occurrence of the max digit.
    c. Append digit to `result`.
    d. Update `startIndex = index_of_max_digit + 1`.
4. Return `result`.

Complexity:
- We pick `k` digits.
- In each step, we scan a range.
- `O(k * N)`. Since `k=12` and `N` is small, this is very fast.

## Parsing & Solving

Input: String of lines.

Part 1: `k=2`.
Part 2: `k=12`.

Algorithm:
1. Split input into lines.
2. For each line, calculate `findMaxJoltage(line, k)`.
3. Sum the results (convert string to number before summing).

## Test Cases

### Part 2 Example
Input:
`987654321111111
811111111111119
234234234234278
818181911112111`

Expected Result: `3121910778619`

Breakdown:
- `987654321111111` -> 987654321111
- `811111111111119` -> 811111111119
- `234234234234278` -> 434234234278
- `818181911112111` -> 888911112111

