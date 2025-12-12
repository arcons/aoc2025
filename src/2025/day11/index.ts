function parseGraph(input: string): Map<string, string[]> {
  const graph = new Map<string, string[]>();
  input.trim().split('\n').forEach(line => {
    const [node, outputs] = line.split(': ');
    if (outputs) {
        graph.set(node, outputs.split(' '));
    }
  });
  return graph;
}

function countPathsBetween(start: string, end: string, graph: Map<string, string[]>): number {
    const memo = new Map<string, number>();

    function count(node: string): number {
        if (node === end) return 1;
        if (memo.has(node)) return memo.get(node)!;

        let total = 0;
        const neighbors = graph.get(node);
        if (neighbors) {
            for (const neighbor of neighbors) {
                total += count(neighbor);
            }
        }
        memo.set(node, total);
        return total;
    }

    return count(start);
}

export const part1 = (input: string): number => {
  const graph = parseGraph(input);
  return countPathsBetween('you', 'out', graph);
};

export const part2 = (input: string): number => {
  const graph = parseGraph(input);
  
  // Check if dac -> fft
  const dacToFft = countPathsBetween('dac', 'fft', graph);
  if (dacToFft > 0) {
      return countPathsBetween('svr', 'dac', graph) * dacToFft * countPathsBetween('fft', 'out', graph);
  }

  // Check if fft -> dac
  const fftToDac = countPathsBetween('fft', 'dac', graph);
  if (fftToDac > 0) {
      return countPathsBetween('svr', 'fft', graph) * fftToDac * countPathsBetween('dac', 'out', graph);
  }

  return 0;
};
