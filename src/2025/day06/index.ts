export function part1(input: string): any {
  const lines = input.split('\n');
  const paddedLines = padLines(lines);

  const blocks = getProblemBlocks(paddedLines);

  let total = 0;
  for (const block of blocks) {
    total += solveBlockPart1(block);
  }
  return total;
}

export function part2(input: string): any {
  const lines = input.split('\n');
  const paddedLines = padLines(lines);

  const blocks = getProblemBlocks(paddedLines);

  let total = 0;
  for (const block of blocks) {
    total += solveBlockPart2(block);
  }
  return total;
}

function padLines(lines: string[]): string[] {
  const maxLength = Math.max(...lines.map(l => l.length));
  return lines.map(l => l.padEnd(maxLength, ' '));
}

function getProblemBlocks(paddedLines: string[]): string[][] {
  const blocks: string[][] = [];
  let currentBlockCols: number[] = [];
  const maxLength = paddedLines[0].length;

  for (let c = 0; c < maxLength; c++) {
    let isEmpty = true;
    for (const line of paddedLines) {
      if (line[c] !== ' ') {
        isEmpty = false;
        break;
      }
    }

    if (isEmpty) {
      if (currentBlockCols.length > 0) {
        blocks.push(extractBlockContent(paddedLines, currentBlockCols));
        currentBlockCols = [];
      }
    } else {
      currentBlockCols.push(c);
    }
  }
  if (currentBlockCols.length > 0) {
    blocks.push(extractBlockContent(paddedLines, currentBlockCols));
  }
  return blocks;
}

function extractBlockContent(lines: string[], cols: number[]): string[] {
  return lines.map(line => {
    return cols.map(c => line[c]).join('');
  });
}

function solveBlockPart1(block: string[]): number {
  const contentLines = block.filter(l => l.trim().length > 0);
  if (contentLines.length === 0) return 0;

  let operator = '';
  let numbers: number[] = [];

  // Find the operator line (the last line containing an operator)
  let operatorLineIndex = -1;
  for (let i = contentLines.length - 1; i >= 0; i--) {
    const trimmed = contentLines[i].trim();
    if (trimmed === '+' || trimmed === '*') {
      operator = trimmed;
      operatorLineIndex = i;
      break;
    }
  }

  if (!operator) return 0;

  // Extract numbers from lines above the operator
  for (let i = 0; i < operatorLineIndex; i++) {
    const trimmed = contentLines[i].trim();
    const num = parseInt(trimmed);
    if (!isNaN(num)) {
      numbers.push(num);
    }
  }

  if (operator === '+') {
    return numbers.reduce((a, b) => a + b, 0);
  } else {
    return numbers.reduce((a, b) => a * b, 1);
  }
}

function solveBlockPart2(block: string[]): number {
  const contentLines = block.filter(l => l.trim().length > 0);
  if (contentLines.length === 0) return 0;

  let operator = '';
  let operatorLineIndex = -1;
  for (let i = contentLines.length - 1; i >= 0; i--) {
    const trimmed = contentLines[i].trim();
    if (trimmed === '+' || trimmed === '*') {
      operator = trimmed;
      operatorLineIndex = i;
      break;
    }
  }

  if (!operator) return 0;

  const numbers: number[] = [];
  const blockWidth = contentLines[0].length;

  for (let c = 0; c < blockWidth; c++) {
    let numStr = '';
    for (let r = 0; r < operatorLineIndex; r++) {
      if (contentLines[r][c] !== ' ') {
        numStr += contentLines[r][c];
      }
    }
    if (numStr.length > 0) {
      const num = parseInt(numStr);
      if (!isNaN(num)) {
        numbers.push(num);
      }
    }
  }

  if (operator === '+') {
    return numbers.reduce((a, b) => a + b, 0);
  } else {
    return numbers.reduce((a, b) => a * b, 1);
  }
}

