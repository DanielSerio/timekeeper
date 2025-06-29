import { _getCursors } from "./_get-cursors";
import { _getOptimizedCallback } from "./_get-optimized-callback";

/**
 * Iterates over an array and applies a callback function to each element, returning an array of
 * the results.
 * @param {ValueType[]} values - The `values` parameter is an array of elements of type `ValueType`
 * that you want to map over using the provided callback function.
 * @param callback - The `callback` parameter in the `map` function is a function that will be applied
 * to each element in the `values` array. It takes three parameters:
 * @returns The `map` function is returning an array of values of type `ReturnType` that are the result
 * of applying the `callback` function to each element in the `values` array.
 */
export function map<ValueType, ReturnType>(
  values: ValueType[],
  callback: (value: ValueType, index: number, vals: ValueType[]) => ReturnType
): ReturnType[] {
  if (values.length === 0) {
    return [];
  } else if (values.length === 1) {
    return [callback(values[0], 0, values)];
  }
  const { middle, ...cursors } = _getCursors(values.length)!;
  let { steps, forward, backward } = cursors;
  const cb = _getOptimizedCallback(values, callback);

  const mapped: ReturnType[] = [];

  if (middle) mapped.push(cb(middle));

  const step = () => {
    mapped.unshift(cb(backward));
    mapped.push(cb(forward));
  };

  if (steps === 0) {
    step();

    return mapped;
  }

  while (steps) {
    step();

    steps -= 1;
    backward -= 1;
    forward += 1;
  }

  return mapped;
}
