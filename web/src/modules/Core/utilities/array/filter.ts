import { _getCursors } from "./_cursor";

/**
 * Quick filter function
 * @param arr The array to filter - Array<T>
 * @param keep The function that determines if the records should be kept - (value: T, index: number) => boolean
 * @returns the filtered array - T[]
 */
export function filter<T>(arr: T[], keep: (value: T, index: number) => boolean): T[] {
  if (arr.length === 0) {
    return arr;
  }

  const cursors = _getCursors(arr.length);

  if (!cursors && keep(arr[0], 0)) {
    return arr;
  }

  const newItems = [] as T[];
  const { middle, ...rest } = cursors!;
  let { backwards, forwards, steps } = rest;

  if (middle && keep(arr[middle], middle)) {
    newItems.push(arr[middle]);
  }

  const step = () => {
    if (keep(arr[backwards], backwards)) {
      newItems.unshift(arr[backwards]);
    }
    if (keep(arr[forwards], forwards)) {
      newItems.push(arr[forwards]);
    }
  };

  if (steps === 0) {
    step();

    return newItems;
  }

  while (steps) {
    step();

    backwards -= 1;
    forwards += 1;
    steps -= 1;
  }

  return newItems;
}