import test from 'node:test';
import assert from 'node:assert/strict';
import { findNearestItemIndex, moveItem } from '../src/utils/reorder.js';

test('moves any exercise to any other position without mutating the workout', () => {
  const exercises = ['A', 'B', 'C', 'D', 'E'];

  assert.deepEqual(moveItem(exercises, 4, 0), ['E', 'A', 'B', 'C', 'D']);
  assert.deepEqual(moveItem(exercises, 2, 4), ['A', 'B', 'D', 'E', 'C']);
  assert.deepEqual(moveItem(exercises, 3, 1), ['A', 'D', 'B', 'C', 'E']);
  assert.deepEqual(exercises, ['A', 'B', 'C', 'D', 'E']);
});

test('finds destinations anywhere in a long exercise list, including gaps', () => {
  const rects = Array.from({ length: 5 }, (_, index) => ({
    top: index * 220,
    bottom: index * 220 + 180,
  }));

  assert.equal(findNearestItemIndex(rects, 25), 0);
  assert.equal(findNearestItemIndex(rects, 535), 2);
  assert.equal(findNearestItemIndex(rects, 870), 4);
  assert.equal(findNearestItemIndex(rects, 650), 3);
});
