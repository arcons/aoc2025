import fs from 'fs';
import path from 'path';
import { Game, Unit } from './index';

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');
const game = new Game(input);

const walls: {x: number, y: number}[] = [];
for (let y = 0; y < game.height; y++) {
  for (let x = 0; x < game.width; x++) {
    if (game.map[y][x] === '#') {
      walls.push({x, y});
    }
  }
}

const frames: any[] = [];

// Initial state
frames.push(game.units.map(u => ({ type: u.type, x: u.x, y: u.y, hp: u.hp })));

let rounds = 0;
while (game.tick()) {
  frames.push(game.units.filter(u => u.hp > 0).map(u => ({ type: u.type, x: u.x, y: u.y, hp: u.hp })));
  rounds++;
  if (rounds > 1000) break; // Safety break
}

const output = {
  width: game.width,
  height: game.height,
  walls,
  frames
};

fs.writeFileSync(path.join(__dirname, 'animation.json'), JSON.stringify(output));
console.log(`Generated ${frames.length} frames.`);
