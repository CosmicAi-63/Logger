export function moveItem(items, fromIndex, toIndex) {
  if (
    fromIndex === toIndex ||
    fromIndex < 0 ||
    toIndex < 0 ||
    fromIndex >= items.length ||
    toIndex >= items.length
  ) {
    return items;
  }

  const reordered = [...items];
  const [moved] = reordered.splice(fromIndex, 1);
  reordered.splice(toIndex, 0, moved);
  return reordered;
}

export function findNearestItemIndex(rects, clientY) {
  let nearestIndex = null;
  let nearestDistance = Infinity;

  rects.forEach((rect, index) => {
    if (!rect) return;
    const distance = Math.abs(clientY - (rect.top + rect.bottom) / 2);
    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestIndex = index;
    }
  });

  return nearestIndex;
}
