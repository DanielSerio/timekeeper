import { _getCursors } from "./_get-cursors";
import { _getOptimizedCallback } from "./_get-optimized-callback";

export function findIndex<ValueType>(
  values: ValueType[],
  callback: (value: ValueType, index: number, vals: ValueType[]) => boolean
): number {
  if (values.length === 0) {
    return -1;
  } else if (values.length === 1 && callback(values[0], 0, values)) {
    return 0;
  }

  const { middle, ...cursors } = _getCursors(values.length)!;
  let { steps, forward, backward } = cursors;
  const cb = _getOptimizedCallback(values, callback);

  if (middle && cb(middle)) {
    return middle;
  }

  const step = () => {
    if (cb(backward)) {
      return backward;
    }

    if (cb(forward)) {
      return forward;
    }

    return null;
  };

  if (steps === 0) {
    return step() ?? -1;
  }

  while (steps) {
    const index = step();

    if (index !== null) {
      return index;
    }

    steps -= 1;
    backward -= 1;
    forward += 1;
  }

  return -1;
}