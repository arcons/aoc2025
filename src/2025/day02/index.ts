export function part1(input: string): any {
  const ranges = input.trim().split(',').map(rangeStr => {
    const [start, end] = rangeStr.split('-').map(Number);
    return { start, end };
  });

  let sum = 0;
  for (const { start, end } of ranges) {
    for (let i = start; i <= end; i++) {
      if (isInvalidID(i)) {
        sum += i;
      }
    }
  }

  return sum;
}

export function part2(input: string): any {
  const ranges = input.trim().split(',').map(rangeStr => {
    const [start, end] = rangeStr.split('-').map(Number);
    return { start, end };
  });

  let sum = 0;
  for (const { start, end } of ranges) {
    for (let i = start; i <= end; i++) {
      if (isInvalidIDPart2(i)) {
        sum += i;
      }
    }
  }

  return sum;
}

export function isInvalidID(n: number): boolean {
  const s = n.toString();
  if (s.length % 2 !== 0) {
    return false;
  }
  const mid = s.length / 2;
  const firstHalf = s.slice(0, mid);
  const secondHalf = s.slice(mid);
  return firstHalf === secondHalf;
}

export function isInvalidIDPart2(n: number): boolean {
  const s = n.toString();
  for (let len = 1; len <= s.length / 2; len++) {
    if (s.length % len === 0) {
      const base = s.slice(0, len);
      const repeatCount = s.length / len;
      if (base.repeat(repeatCount) === s) {
        return true;
      }
    }
  }
  return false;
}
