export function updateSourceAndTarget(links, nodes) {
  return links.map(d => {
    d.source = nodes[d.sourceIndex];
    d.target = nodes[d.targetIndex];
    d.x1 = d.source.x;
    d.y1 = d.source.y;
    d.x2 = d.target.x;
    d.y2 = d.target.y;
    return d;
  })
}