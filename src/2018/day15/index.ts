import fs from 'fs';

type Point = { x: number, y: number };
type UnitType = 'G' | 'E';

export class Unit {
  id: number;
  type: UnitType;
  x: number;
  y: number;
  hp: number = 200;
  ap: number = 3;

  constructor(id: number, type: UnitType, x: number, y: number, ap: number = 3) {
    this.id = id;
    this.type = type;
    this.x = x;
    this.y = y;
    this.ap = ap;
  }
}

export class Game {
  map: string[][];
  units: Unit[] = [];
  rounds: number = 0;
  width: number;
  height: number;

  constructor(input: string, elfAp: number = 3) {
    const lines = input.trim().split('\n');
    this.height = lines.length;
    this.width = lines[0].length;
    this.map = [];
    let unitId = 0;

    for (let y = 0; y < this.height; y++) {
      const row = lines[y].split('');
      const mapRow: string[] = [];
      for (let x = 0; x < this.width; x++) {
        const char = row[x];
        if (char === 'G' || char === 'E') {
          this.units.push(new Unit(unitId++, char as UnitType, x, y, char === 'E' ? elfAp : 3));
          mapRow.push('.');
        } else {
          mapRow.push(char);
        }
      }
      this.map.push(mapRow);
    }
  }

  getUnitAt(x: number, y: number): Unit | undefined {
    return this.units.find(u => u.x === x && u.y === y && u.hp > 0);
  }

  isOpen(x: number, y: number): boolean {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) return false;
    return this.map[y][x] === '.' && !this.getUnitAt(x, y);
  }

  // BFS to find distances from start to all reachable squares
  bfs(start: Point): Map<string, number> {
    const dist = new Map<string, number>();
    const q: Point[] = [start];
    dist.set(`${start.x},${start.y}`, 0);

    let head = 0;
    while (head < q.length) {
      const curr = q[head++];
      const d = dist.get(`${curr.x},${curr.y}`)!;

      const neighbors = [
        { x: curr.x, y: curr.y - 1 },
        { x: curr.x - 1, y: curr.y },
        { x: curr.x + 1, y: curr.y },
        { x: curr.x, y: curr.y + 1 }
      ];

      for (const n of neighbors) {
        const key = `${n.x},${n.y}`;
        if (!dist.has(key) && this.isOpen(n.x, n.y)) {
          dist.set(key, d + 1);
          q.push(n);
        }
      }
    }
    return dist;
  }

  tick(): boolean {
    // Sort units by reading order
    this.units.sort((a, b) => a.y - b.y || a.x - b.x);

    for (let i = 0; i < this.units.length; i++) {
      const u = this.units[i];
      if (u.hp <= 0) continue;

      const targets = this.units.filter(t => t.hp > 0 && t.type !== u.type);
      if (targets.length === 0) return false; // Combat ends

      // Try to move
      let inRange = false;
      const adj = [
        { x: u.x, y: u.y - 1 },
        { x: u.x - 1, y: u.y },
        { x: u.x + 1, y: u.y },
        { x: u.x, y: u.y + 1 }
      ];

      for (const t of targets) {
        if (Math.abs(u.x - t.x) + Math.abs(u.y - t.y) === 1) {
          inRange = true;
          break;
        }
      }

      if (!inRange) {
        // Move logic
        const inRangeSquares: Point[] = [];
        for (const t of targets) {
          const tAdj = [
            { x: t.x, y: t.y - 1 },
            { x: t.x - 1, y: t.y },
            { x: t.x + 1, y: t.y },
            { x: t.x, y: t.y + 1 }
          ];
          for (const p of tAdj) {
            if (this.isOpen(p.x, p.y)) {
              inRangeSquares.push(p);
            }
          }
        }

        if (inRangeSquares.length > 0) {
          const dists = this.bfs(u);
          const reachable = inRangeSquares.filter(p => dists.has(`${p.x},${p.y}`));

          if (reachable.length > 0) {
            reachable.sort((a, b) => {
              const da = dists.get(`${a.x},${a.y}`)!;
              const db = dists.get(`${b.x},${b.y}`)!;
              if (da !== db) return da - db;
              if (a.y !== b.y) return a.y - b.y;
              return a.x - b.x;
            });
            const chosen = reachable[0];

            // Find next step towards chosen
            const distsFromChosen = this.bfs(chosen);
            const neighbors = [
              { x: u.x, y: u.y - 1 },
              { x: u.x - 1, y: u.y },
              { x: u.x + 1, y: u.y },
              { x: u.x, y: u.y + 1 }
            ];
            let bestNext: Point | null = null;
            let minD = Infinity;

            for (const n of neighbors) {
              if (this.isOpen(n.x, n.y)) {
                const d = distsFromChosen.get(`${n.x},${n.y}`);
                if (d !== undefined && d < minD) {
                  minD = d;
                  bestNext = n;
                }
              }
            }

            if (bestNext) {
              u.x = bestNext.x;
              u.y = bestNext.y;
            }
          }
        }
      }

      // Attack logic
      const enemies = this.units.filter(t => t.hp > 0 && t.type !== u.type && Math.abs(u.x - t.x) + Math.abs(u.y - t.y) === 1);
      if (enemies.length > 0) {
        enemies.sort((a, b) => {
          if (a.hp !== b.hp) return a.hp - b.hp;
          if (a.y !== b.y) return a.y - b.y;
          return a.x - b.x;
        });
        const target = enemies[0];
        target.hp -= u.ap;
      }
    }
    this.rounds++;
    return true;
  }
}

export const part1 = (input: string) => {
  const game = new Game(input);
  while (game.tick()) {}
  const totalHp = game.units.filter(u => u.hp > 0).reduce((sum, u) => sum + u.hp, 0);
  return game.rounds * totalHp;
};

export const part2 = (input: string) => {
  let ap = 4;
  while (true) {
    const game = new Game(input, ap);
    let elfDied = false;
    const initialElves = game.units.filter(u => u.type === 'E').length;

    while (game.tick()) {
      const currentElves = game.units.filter(u => u.type === 'E' && u.hp > 0).length;
      if (currentElves < initialElves) {
        elfDied = true;
        break;
      }
    }
    if (!elfDied) {
      const currentElves = game.units.filter(u => u.type === 'E' && u.hp > 0).length;
      if (currentElves < initialElves) elfDied = true;
    }

    if (!elfDied) {
      const totalHp = game.units.filter(u => u.hp > 0).reduce((sum, u) => sum + u.hp, 0);
      return game.rounds * totalHp;
    }
    ap++;
  }
};
