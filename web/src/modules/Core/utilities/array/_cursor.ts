export interface IteratorCursors {
  backwards: number;
  forwards: number;
  middle?: number;
  steps: number;
}
/**
 * Get's the cursor positions for quicker iteration.
 * @param length length of ther array - number
 * @returns cursors - {@link IteratorCursors} | null
 */
export function _getCursors(length: number): null | IteratorCursors {
  if (length < 2) {
    return null;
  }

  if (length === 2) {
    return {
      steps: 0,
      forwards: 1,
      backwards: 0
    };
  } else if (length === 3) {
    return {
      steps: 0,
      forwards: 2,
      middle: 1,
      backwards: 0
    };
  }

  const exactCenter = length / 2;
  let forwards = ~~exactCenter;
  const backwards = forwards - 1;

  if (exactCenter % 1 !== 0) {
    const middle = forwards;
    forwards += 1;

    return {
      steps: length - forwards,
      forwards,
      middle,
      backwards,
    };
  }

  return {
    steps: length - forwards,
    forwards,
    backwards,
  };
}