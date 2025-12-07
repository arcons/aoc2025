export function part1(input: string): number {
  const grid = input.split('\n').map(row => row.split(''));
  const numRows = grid.length;
  const numCols = grid[0].length;

  let startCol = -1;
  for (let c = 0; c < numCols; c++) {
    if (grid[0][c] === 'S') {
      startCol = c;
      break;
    }
  }

  let splits = 0;
  let activeBeamPositions = new Set<string>();
  activeBeamPositions.add(`0,${startCol}`);

  let encounteredSplitters = new Set<string>();

  for (let r = 0; r < numRows - 1; r++) {
    const nextActiveBeamPositions = new Set<string>();

    for (const beamPosStr of activeBeamPositions) {
      const [currR, currC] = beamPosStr.split(',').map(Number);

      const nextR = currR + 1;
      const nextC = currC;

      if (nextR >= numRows || nextC < 0 || nextC >= numCols) {
        continue;
      }

      const targetChar = grid[nextR][nextC];
      const targetPosStr = `${nextR},${nextC}`;

      if (targetChar === '.') {
        nextActiveBeamPositions.add(targetPosStr);
      } else if (targetChar === '^') {
        if (!encounteredSplitters.has(targetPosStr)) {
          splits++;
          encounteredSplitters.add(targetPosStr);
        }

        const leftCol = nextC - 1;
        if (leftCol >= 0) {
          nextActiveBeamPositions.add(`${nextR},${leftCol}`);
        }

        const rightCol = nextC + 1;
        if (rightCol < numCols) {
          nextActiveBeamPositions.add(`${nextR},${rightCol}`);
        }
      }
    }

    activeBeamPositions = nextActiveBeamPositions;

    if (activeBeamPositions.size === 0) {
      break;
    }
  }

  return splits;
}

export function part2(input: string): number {
  const grid = input.split('\n').map(row => row.split(''));
  const numRows = grid.length;
  const numCols = grid[0].length;

  let startCol = -1;
  for (let c = 0; c < numCols; c++) {
    if (grid[0][c] === 'S') {
      startCol = c;
      break;
    }
  }

  // Map to store "row,col" -> number of timelines reaching that cell
  let activeBeamCounts = new Map<string, number>();
  activeBeamCounts.set(`0,${startCol}`, 1);

  for (let r = 0; r < numRows - 1; r++) {
    const nextActiveBeamCounts = new Map<string, number>();

    for (const [beamPosStr, count] of activeBeamCounts.entries()) {
      const [currR, currC] = beamPosStr.split(',').map(Number);

      const nextR = currR + 1;
      const nextC = currC;

      if (nextR >= numRows || nextC < 0 || nextC >= numCols) {
        continue; // This timeline branch exits the manifold
      }

      const targetChar = grid[nextR][nextC];
      const targetPosStr = `${nextR},${nextC}`;

      if (targetChar === '.') {
        nextActiveBeamCounts.set(targetPosStr, (nextActiveBeamCounts.get(targetPosStr) || 0) + count);
      } else if (targetChar === '^') {
        // Splitter encountered! The count timelines each split into two.
        // Left path:
        const leftCol = nextC - 1;
        if (leftCol >= 0) {
          const leftPosStr = `${nextR},${leftCol}`;
          nextActiveBeamCounts.set(leftPosStr, (nextActiveBeamCounts.get(leftPosStr) || 0) + count);
        }

        // Right path:
        const rightCol = nextC + 1;
        if (rightCol < numCols) {
          const rightPosStr = `${nextR},${rightCol}`;
          nextActiveBeamCounts.set(rightPosStr, (nextActiveBeamCounts.get(rightPosStr) || 0) + count);
        }
      }
    }

    activeBeamCounts = nextActiveBeamCounts;

    if (activeBeamCounts.size === 0) {
      break;
    }
  }

  // Sum all counts in the final activeBeamCounts map
  let totalTimelines = 0;
  for (const count of activeBeamCounts.values()) {
    totalTimelines += count;
  }

  return totalTimelines;
}

