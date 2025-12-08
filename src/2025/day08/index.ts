interface Coordinate {
  x: number;
  y: number;
  z: number;
}

function parseCoordinates(input: string): Coordinate[] {
  return input.split('\n').map(line => {
    const [x, y, z] = line.split(',').map(Number);
    return { x, y, z };
  });
}

function distanceSquared(c1: Coordinate, c2: Coordinate): number {
  return (c1.x - c2.x)**2 + (c1.y - c2.y)**2 + (c1.z - c2.z)**2;
}

class DSU {
  parent: number[];
  size: number[];
  numComponents: number;

  constructor(n: number) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.size = Array(n).fill(1);
    this.numComponents = n;
  }

  find(i: number): number {
    if (this.parent[i] === i) {
      return i;
    }
    this.parent[i] = this.find(this.parent[i]);
    return this.parent[i];
  }

  union(i: number, j: number): boolean {
    let rootI = this.find(i);
    let rootJ = this.find(j);

    if (rootI !== rootJ) {
      if (this.size[rootI] < this.size[rootJ]) {
        [rootI, rootJ] = [rootJ, rootI];
      }
      this.parent[rootJ] = rootI;
      this.size[rootI] += this.size[rootJ];
      this.numComponents--; // Decrement component count on successful union
      return true;
    }
    return false;
  }

  getSetSizes(): number[] {
    const rootSizes = new Map<number, number>();
    for (let i = 0; i < this.parent.length; i++) {
      const root = this.find(i);
      rootSizes.set(root, this.size[root]);
    }
    return Array.from(rootSizes.values());
  }
}

export function part1(input: string, numConnections: number = 1000): number {
  const coordinates = parseCoordinates(input);
  const n = coordinates.length;

  const edges: [number, number, number][] = [];

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const distSq = distanceSquared(coordinates[i], coordinates[j]);
      edges.push([distSq, i, j]);
    }
  }

  edges.sort((a, b) => a[0] - b[0]);

  const dsu = new DSU(n);
  let edgesProcessed = 0; 

  for (const [dist, i, j] of edges) {
    if (edgesProcessed >= numConnections) {
      break;
    }
    dsu.union(i, j); 
    edgesProcessed++; 
  }

  const setSizes = dsu.getSetSizes();
  setSizes.sort((a, b) => b - a);

  let product = 1;
  for (let k = 0; k < Math.min(3, setSizes.length); k++) {
    product *= setSizes[k];
  }

  return product;
}

export function part2(input: string): number {
  const coordinates = parseCoordinates(input);
  const n = coordinates.length;

  const edges: [number, number, number][] = [];

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const distSq = distanceSquared(coordinates[i], coordinates[j]);
      edges.push([distSq, i, j]);
    }
  }

  edges.sort((a, b) => a[0] - b[0]);

  const dsu = new DSU(n);
  let lastConnectedCoords: [Coordinate, Coordinate] | null = null;

  for (const [dist, i, j] of edges) {
    if (dsu.union(i, j)) {
      if (dsu.numComponents === 1) {
        lastConnectedCoords = [coordinates[i], coordinates[j]];
        break;
      }
    }
  }

  if (lastConnectedCoords) {
    return lastConnectedCoords[0].x * lastConnectedCoords[1].x;
  }
  return 0;
}
