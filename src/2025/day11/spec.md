# Spec
Parse input to Map<string, string[]>.
DFS with memoization to count paths from 'you' to 'out'.
Example input should return 5.

## Part 2 Logic
1. Generalize countPaths to countPaths(start, end).
2. Calculate paths assuming sequence svr -> dac -> fft -> out: A = count('svr', 'dac') * count('dac', 'fft') * count('fft', 'out').
3. Calculate paths assuming sequence svr -> fft -> dac -> out: B = count('svr', 'fft') * count('fft', 'dac') * count('dac', 'out').
4. Return A + B. (Assuming no cycles, one of them will be 0).
