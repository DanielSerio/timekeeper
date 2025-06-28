import { _getCursors } from "./_get-cursors";
import { _getOptimizedCallback } from "./_get-optimized-callback";

/**
 * Filters an array of values based on a provided callback function and returns an array of filtered
 * values.
 * @param {ValueType[]} values - `values` is an array of elements of type `ValueType` that you want to
 * filter based on the provided callback function.
 * @param callback - The `callback` parameter in the `filter` function is a function that takes three
 * arguments:
 * @returns The `filter` function returns an array of values that pass the provided callback function.
 * The returned array contains only the values that satisfy the condition specified in the callback
 * function.
 */
export function filter<ValueType, Filtered extends ValueType>(
  values: ValueType[],
  callback: (value: ValueType, index: number, vals: ValueType[]) => boolean
): Filtered[] {
  if (values.length === 0) {
    return [];
  } else if (values.length === 1 && callback(values[0], 0, values)) {
    return values as Filtered[];
  }

  const { middle, ...cursors } = _getCursors(values.length)!;
  let { steps, forward, backward } = cursors;
  const cb = _getOptimizedCallback(values, callback);

  const filtered: Filtered[] = [];

  if (middle && cb(middle)) {
    filtered.push(values[middle] as Filtered);
  }

  const step = () => {
    if (cb(backward)) {
      filtered.unshift(values[backward] as Filtered);
    }

    if (cb(forward)) {
      filtered.push(values[forward] as Filtered);
    }
  };

  if (steps === 0) {
    step();

    return filtered;
  }

  while (steps) {
    step();

    steps -= 1;
    backward -= 1;
    forward += 1;
  }

  return filtered;
}
