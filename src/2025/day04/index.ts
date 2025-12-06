export function part1(input: string): any {
  const grid = input.trim().split('\n');
  return countAccessibleRolls(grid);
}

export function part2(input: string): any {
  let grid = input.trim().split('\n').map(line => line.split(''));
  let totalRemoved = 0;

  while (true) {
    const toRemove: [number, number][] = [];
    const rows = grid.length;
    const cols = grid[0].length;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (grid[r][c] === '@') {
          if (countNeighbors2D(grid, r, c) < 4) {
            toRemove.push([r, c]);
          }
        }
      }
    }

    if (toRemove.length === 0) break;

    for (const [r, c] of toRemove) {
      grid[r][c] = '.';
    }
    totalRemoved += toRemove.length;
  }

  return totalRemoved;
}

export function countAccessibleRolls(grid: string[]): number {
  let count = 0;
  const rows = grid.length;
  const cols = grid[0].length;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '@') {
        if (countNeighbors(grid, r, c) < 4) {
          count++;
        }
      }
    }
  }
  return count;
}

function countNeighbors(grid: string[], r: number, c: number): number {
  let neighbors = 0;
  const rows = grid.length;
  const cols = grid[0].length;
  const offsets = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1],  [1, 0],  [1, 1]
  ];

  for (const [dr, dc] of offsets) {
    const nr = r + dr;
    const nc = c + dc;
    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === '@') {
      neighbors++;
    }
  }
  return neighbors;
}

function countNeighbors2D(grid: string[][], r: number, c: number): number {
  let neighbors = 0;
  const rows = grid.length;
  const cols = grid[0].length;
  const offsets = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1],  [1, 0],  [1, 1]
  ];

  for (const [dr, dc] of offsets) {
    const nr = r + dr;
    const nc = c + dc;
    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === '@') {
      neighbors++;
    }
  }
  return neighbors;
}
