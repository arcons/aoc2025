export function part1(input: string): any {
  const [rangesPart, idsPart] = input.trim().split('\n\n');
  const ranges = rangesPart.split('\n').map(line => {
    const [start, end] = line.split('-').map(Number);
    return { start, end };
  });
  const ids = idsPart.split('\n').map(Number);

  let freshCount = 0;
  for (const id of ids) {
    if (ranges.some(range => id >= range.start && id <= range.end)) {
      freshCount++;
    }
  }
  return freshCount;
}

export function part2(input: string): any {
  const [rangesPart] = input.trim().split('\n\n');
  const ranges = rangesPart.split('\n').map(line => {
    const [start, end] = line.split('-').map(Number);
    return { start, end };
  });

  // Sort ranges by start
  ranges.sort((a, b) => a.start - b.start);

  const mergedRanges: { start: number; end: number }[] = [];
  for (const range of ranges) {
    if (mergedRanges.length === 0) {
      mergedRanges.push(range);
    } else {
      const last = mergedRanges[mergedRanges.length - 1];
      // Merge if contiguous or overlapping
      if (range.start <= last.end + 1) {
        last.end = Math.max(last.end, range.end);
      } else {
        mergedRanges.push(range);
      }
    }
  }

  let totalFresh = 0;
  for (const range of mergedRanges) {
    totalFresh += range.end - range.start + 1;
  }

  return totalFresh;
}
