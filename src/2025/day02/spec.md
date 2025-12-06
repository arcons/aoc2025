# Specification - Day 2: Gift Shop

## Part 1: isInvalidID(n: number): boolean

A number is an "invalid ID" if:
1. It has an even number of digits.
2. The first half of the digits equals the second half.

## Part 2: isInvalidIDPart2(n: number): boolean

A number is an "invalid ID" if its string representation consists of a sequence of digits repeated **at least twice**.

Algorithm:
1. Get the string representation `s` of the number.
2. Iterate through possible lengths for the base sequence (`len`), from 1 to `s.length / 2`.
3. If `s.length` is divisible by `len`:
    a. Extract the base sequence: `base = s.substring(0, len)`.
    b. Construct a new string by repeating `base` for `s.length / len` times.
    c. If the constructed string equals `s`, return `true`.
4. If no such sequence is found, return `false`.

Examples:
- `123123123` (len=3, repeated 3 times) -> true
- `111` (len=1, repeated 3 times) -> true
- `121212` (len=2, repeated 3 times) OR (len=6, NO) wait... (len=2 repeated 3 times) -> true
- `123124` -> false

## Parsing & Solving

Input: String of comma-separated ranges "start-end".

Algorithm:
Same as Part 1, but using the appropriate validity check function.

## Test Cases

### Part 2 Example
Input:
`11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`

Expected Result: `4174379265`

Breakdown of invalid IDs found:
- 11 (1*2)
- 22 (2*2)
- 99 (9*2)
- 111 (1*3)
- 999 (9*3)
- 1010 (10*2)
- 1188511885 (11885*2)
- 222222 (2*6 or 22*3 or 222*2)
- 446446 (446*2)
- 38593859 (3859*2)
- 565656 (56*3)
- 824824824 (824*3)
- 2121212121 (21*5)

