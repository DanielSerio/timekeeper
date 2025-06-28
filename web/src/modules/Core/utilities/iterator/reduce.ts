/**
 * Takes an array, a callback function, and an initial value, and reduces the array to a single value
 * using the callback function.
 * @param {T[]} array - An array of elements of type T that you want to reduce.
 * @param callback - The `callback` parameter is a function that will be called on each element of the
 * array. It takes four arguments:
 * @param {U} initialValue - The `initialValue` parameter is the initial value of the accumulator. It
 * is the starting value for the reduction.
 * @returns The `reduce` function is being returned.
 */
export function reduce<T, U>(
  array: T[],
  callback: (accumulator: U, currentValue: T, index: number, array: T[]) => U,
  initialValue: U
): U {
  return array.reduce(callback, initialValue);
}
