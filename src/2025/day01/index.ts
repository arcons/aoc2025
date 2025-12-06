export function part1(input: string): number {
  let dialPosition = 50;
  let zeroCount = 0;

  const rotations = input.split('\n').filter(line => line.length > 0);

  for (const rotation of rotations) {
    const direction = rotation[0];
    const distance = parseInt(rotation.slice(1), 10);

    if (direction === 'R') {
      dialPosition += distance;
    } else if (direction === 'L') {
      dialPosition -= distance;
    }

    dialPosition = (dialPosition % 100 + 100) % 100;

    if (dialPosition === 0) {
      zeroCount++;
    }
  }

  return zeroCount;
}

export function part2(input: string): number {
  return 0;
}
