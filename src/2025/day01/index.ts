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
  const rotations = input.split('\n').filter(line => line.length > 0);
  let position = 50;
  let zeroCount = 0;

  for (const rotation of rotations) {
    const direction = rotation[0];
    const distance = parseInt(rotation.slice(1), 10);
    const current_pos = position;

    if (direction === 'R') {
        const num_k = Math.floor((current_pos + distance) / 100) - Math.ceil((current_pos + 1) / 100) + 1;
        if (num_k > 0) {
          zeroCount += num_k;
        }
        position += distance;
    } else { // direction === 'L'
        const num_k = Math.floor((current_pos - 1) / 100) - Math.ceil((current_pos - distance) / 100) + 1;
        if (num_k > 0) {
          zeroCount += num_k;
        }
        position -= distance;
    }

    position = (position % 100 + 100) % 100;
  }

  return zeroCount;
}
