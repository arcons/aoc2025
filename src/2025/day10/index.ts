export function part1(input: string): number {
  const lines = input.trim().split('\n');
  let total = 0;
  for (const line of lines) {
    if (!line.trim()) continue;
    total += solveMachineP1(line);
  }
  return total;
}

export function part2(input: string): number {
  const lines = input.trim().split('\n');
  let total = 0;
  for (const line of lines) {
    if (!line.trim()) continue;
    const res = solveMachineP2(line);
    if (res !== Infinity) {
        total += res;
    }
  }
  return total;
}

function solveMachineP1(line: string): number {
  const targetMatch = line.match(/^\[([.#]+)\]/);
  if (!targetMatch) throw new Error('Invalid line');
  const targetStr = targetMatch[1];
  let target = 0n;
  for (let i = 0; i < targetStr.length; i++) {
    if (targetStr[i] === '#') {
      target |= (1n << BigInt(i));
    }
  }

  const buttonMatches = line.matchAll(/\(([\d,]+)\)/g);
  const buttons: bigint[] = [];
  
  for (const match of buttonMatches) {
    const nums = match[1].split(',').map(Number);
    let b = 0n;
    for (const n of nums) {
      b |= (1n << BigInt(n));
    }
    buttons.push(b);
  }

  const B = buttons.length;

  for (let k = 0; k <= B; k++) {
    if (findCombination(buttons, target, k, 0, 0n)) {
      return k;
    }
  }

  return 0;
}

function findCombination(buttons: bigint[], target: bigint, k: number, startIndex: number, currentVal: bigint): boolean {
  if (k === 0) {
    return currentVal === target;
  }

  for (let i = startIndex; i <= buttons.length - k; i++) {
    const nextVal = currentVal ^ buttons[i];
    if (findCombination(buttons, target, k - 1, i + 1, nextVal)) {
      return true;
    }
  }
  return false;
}

function solveMachineP2(line: string): number {
    const braceMatch = line.match(/\{([\d,]+)\}/);
    if (!braceMatch) return 0;
    const target = braceMatch[1].split(',').map(Number);
    
    const buttonMatches = line.matchAll(/\(([\d,]+)\)/g);
    const buttons: number[][] = [];
    const M = target.length;
    
    for (const match of buttonMatches) {
        const affected = match[1].split(',').map(Number);
        const col = new Array(M).fill(0);
        for (const idx of affected) {
            if (idx < M) col[idx] = 1; 
        }
        buttons.push(col);
    }
    
    return solveLinearSystem(buttons, target);
}

function solveLinearSystem(columns: number[][], target: number[]): number {
    const M = target.length;
    const N = columns.length;
    
    const mat: number[][] = [];
    for (let i=0; i<M; i++) {
        const row: number[] = [];
        for (let j=0; j<N; j++) {
            row.push(columns[j][i]);
        }
        row.push(target[i]);
        mat.push(row);
    }
    
    let pivotRow = 0;
    const pivots: number[] = new Array(N).fill(-1);
    const freeVars: number[] = [];
    
    for (let col=0; col<N && pivotRow < M; col++) {
        let sel = -1;
        for (let row=pivotRow; row<M; row++) {
            if (Math.abs(mat[row][col]) > 1e-5) { // Looser epsilon for pivot selection
                sel = row;
                break;
            }
        }
        
        if (sel === -1) {
            freeVars.push(col);
            continue;
        }
        
        [mat[pivotRow], mat[sel]] = [mat[sel], mat[pivotRow]];
        
        const div = mat[pivotRow][col];
        for (let j=col; j<=N; j++) {
            mat[pivotRow][j] /= div;
        }
        
        for (let i=0; i<M; i++) {
            if (i !== pivotRow) {
                const fac = mat[i][col];
                if (Math.abs(fac) > 1e-9) {
                    for (let j=col; j<=N; j++) {
                        mat[i][j] -= fac * mat[pivotRow][j];
                    }
                }
            }
        }
        
        pivots[col] = pivotRow;
        pivotRow++;
    }
    
    for (let col=0; col<N; col++) {
        if (pivots[col] === -1 && !freeVars.includes(col)) {
             freeVars.push(col);
        }
    }
    
    for (let i=pivotRow; i<M; i++) {
        if (Math.abs(mat[i][N]) > 1e-5) return Infinity; // Consistency check
    }
    
    if (freeVars.length === 0) {
        let sum = 0;
        for (let j=0; j<N; j++) {
            const row = pivots[j];
            if (row === -1) return Infinity;
            const val = mat[row][N];
            if (val < -1e-5 || Math.abs(val - Math.round(val)) > 1e-4) return Infinity;
            sum += Math.round(val);
        }
        return sum;
    }
    
    let minTotal = Infinity;
    
    const search = (idx: number, currentFreeVals: number[]) => {
        if (idx === freeVars.length) {
            let currentSum = 0;
            for (const v of currentFreeVals) currentSum += v;
            
            for (let j=0; j<N; j++) {
                if (freeVars.includes(j)) continue;
                const row = pivots[j];
                let val = mat[row][N];
                for (let f=0; f<freeVars.length; f++) {
                    const fCol = freeVars[f];
                    val -= mat[row][fCol] * currentFreeVals[f];
                }
                
                // Allow slightly larger negative due to float precision, but strict for integers
                if (val < -1e-4) return;
                if (Math.abs(val - Math.round(val)) > 1e-4) return;
                currentSum += Math.round(val);
            }
            if (currentSum < minTotal) minTotal = currentSum;
            return;
        }
        
        for (let v=0; v<=200; v++) {
            currentFreeVals[idx] = v;
            search(idx+1, currentFreeVals);
        }
    }
    
    search(0, new Array(freeVars.length));
    
    return minTotal;
}
