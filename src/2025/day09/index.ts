
interface Point { x: number, y: number }
interface Edge { p1: Point, p2: Point }
interface Rect { minX: number, maxX: number, minY: number, maxY: number }

function parse(input: string): Point[] {
  return input.trim().split('\n').map(line => {
    const [x, y] = line.split(',').map(Number);
    return { x, y };
  });
}

export function part1(input: string): number {
  const points = parse(input);
  let maxArea = 0;
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const p1 = points[i];
      const p2 = points[j];
      const area = (Math.abs(p1.x - p2.x) + 1) * (Math.abs(p1.y - p2.y) + 1);
      if (area > maxArea) {
        maxArea = area;
      }
    }
  }
  return maxArea;
}

export function part2(input: string): number {
  const points = parse(input);
  const edges: Edge[] = [];
  for (let i = 0; i < points.length; i++) {
    edges.push({ p1: points[i], p2: points[(i + 1) % points.length] });
  }

  let maxArea = 0;
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const p1 = points[i];
      const p2 = points[j];
      const minX = Math.min(p1.x, p2.x);
      const maxX = Math.max(p1.x, p2.x);
      const minY = Math.min(p1.y, p2.y);
      const maxY = Math.max(p1.y, p2.y);
      
      const area = (maxX - minX + 1) * (maxY - minY + 1);
      if (area <= maxArea) continue;

      const rect = { minX, maxX, minY, maxY };
      if (isValid(rect, edges)) {
        maxArea = area;
      }
    }
  }
  return maxArea;
}

function isValid(rect: Rect, edges: Edge[]): boolean {
  // Check 1: No edge intersects interior
  if (edgesIntersectRect(rect, edges)) return false;
  
  // Check 2: Center is inside
  const centerX = (rect.minX + rect.maxX) / 2;
  const centerY = (rect.minY + rect.maxY) / 2;
  return isPointInPolygon({ x: centerX, y: centerY }, edges);
}

function edgesIntersectRect(rect: Rect, edges: Edge[]): boolean {
  for (const edge of edges) {
    if (edgeIntersectsRectInterior(edge, rect)) return true;
  }
  return false;
}

function edgeIntersectsRectInterior(edge: Edge, rect: Rect): boolean {
  // Edge is either vertical or horizontal
  if (edge.p1.x === edge.p2.x) { // Vertical
    const x = edge.p1.x;
    const y1 = Math.min(edge.p1.y, edge.p2.y);
    const y2 = Math.max(edge.p1.y, edge.p2.y);
    
    // Check if x is strictly between rect.minX and rect.maxX
    if (x > rect.minX && x < rect.maxX) {
      // Check if y interval overlaps strictly with rect y interval
      const intersectStart = Math.max(y1, rect.minY);
      const intersectEnd = Math.min(y2, rect.maxY);
      if (intersectStart < intersectEnd) return true;
    }
  } else { // Horizontal
    const y = edge.p1.y;
    const x1 = Math.min(edge.p1.x, edge.p2.x);
    const x2 = Math.max(edge.p1.x, edge.p2.x);
    
    if (y > rect.minY && y < rect.maxY) {
      const intersectStart = Math.max(x1, rect.minX);
      const intersectEnd = Math.min(x2, rect.maxX);
      if (intersectStart < intersectEnd) return true;
    }
  }
  return false;
}

function isPointInPolygon(p: Point, edges: Edge[]): boolean {
  let inside = false;
  for (const edge of edges) {
    const p1 = edge.p1;
    const p2 = edge.p2;
    // Check if ray from p towards +X intersects edge
    // Edge must span p.y
    if ((p1.y > p.y) !== (p2.y > p.y)) {
       // Calculate x intersection
       const xIntersect = p1.x + (p.y - p1.y) * (p2.x - p1.x) / (p2.y - p1.y);
       if (p.x < xIntersect) {
         inside = !inside;
       }
    }
  }
  return inside;
}

