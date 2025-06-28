export type IteratorCursors = {
  steps: number;
  forward: number;
  backward: number;
  middle?: number;
};
/**
 * Calculates and returns cursor positions based on the input length, with special handling for
 * different lengths.
 * @param {number} forLength - The `_getCursors` function takes a parameter `forLength`, which is a
 * number representing the length for which the cursor positions need to be calculated. The function
 * then determines the cursor positions based on the length provided.
 * @returns The function `_getCursors` returns an object with properties representing the cursor
 * positions for a given length. The properties include `steps`, `forward`, `middle`, and `backward`
 * depending on the length provided.
 */
export function _getCursors(forLength: number): IteratorCursors | null {
  const len = ~~forLength;

  if (len < 2) return null;

  const basis = {
    steps: 0,
  };

  if (len === 2) {
    return {
      ...basis,
      forward: 1,
      backward: 0,
    };
  } else if (len === 3) {
    return {
      ...basis,
      forward: 2,
      middle: 1,
      backward: 0,
    };
  }

  const exactCenter = len / 2;
  let forward = ~~exactCenter;
  const backward = forward - 1;

  if (exactCenter % 1 !== 0) {
    const middle = forward;
    forward += 1;

    return {
      steps: len - forward,
      forward,
      middle,
      backward,
    };
  }

  return {
    steps: len - forward,
    forward,
    backward,
  };
}
