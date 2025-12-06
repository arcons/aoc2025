export function part1(input: string): any {
  return input.trim().split('\n').reduce((sum, line) => sum + parseInt(findMaxJoltage(line, 2)), 0);
}

export function part2(input: string): any {
  return input.trim().split('\n').reduce((sum, line) => sum + parseInt(findMaxJoltage(line, 12)), 0);
}

export function findMaxJoltage(bank: string, k: number): string {
  let result = '';
  let startIndex = 0;
  for (let count = k; count >= 1; count--) {
    let maxDigit = -1;
    let maxIndex = -1;
    const endIndex = bank.length - count;
    for (let i = startIndex; i <= endIndex; i++) {
      const digit = parseInt(bank[i]);
      if (digit > maxDigit) {
        maxDigit = digit;
        maxIndex = i;
        if (maxDigit === 9) break; // Optimization: 9 is max possible digit
      }
    }
    result += maxDigit;
    startIndex = maxIndex + 1;
  }
  return result;
}
