import { _getCursors } from "./_get-cursors";
import { _getOptimizedCallback } from "./_get-optimized-callback";

/**
 * Iterates over an array of values and executes a callback function for each element, with
 * optimizations for different array lengths.
 * @param {ValueType[]} values - The `values` parameter is an array of elements of type `ValueType`
 * that you want to iterate over using the `forEach` function.
 * @param callback - The `callback` parameter in the `forEach` function is a function that will be
 * called for each element in the `values` array. It takes three parameters:
 * @returns The `forEach` function is returning `void`, which means it does not return any value.
 */
export function forEach<ValueType = unknown>(
  values: ValueType[],
  callback: (value: ValueType, index: number, vals: ValueType[]) => void
): void {
  if (values.length === 0) {
    return;
  } else if (values.length === 1) {
    callback(values[0], 0, values);
    return;
  }

  const { middle, ...cursors } = _getCursors(values.length)!;
  let { steps, forward, backward } = cursors;
  const cb = _getOptimizedCallback(values, callback);

  if (middle) cb(middle);

  const step = () => {
    cb(backward);
    cb(forward);
  };

  if (steps === 0) {
    step();

    return;
  }

  while (steps) {
    step();

    steps -= 1;
    backward -= 1;
    forward += 1;
  }

  return;
}
