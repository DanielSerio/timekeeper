/**
 * Function to constrain a number within a specified range.
 * If the value is less than the minimum, it returns the minimum value.
 * If the value is greater than the maximum, it returns the maximum value.
 * Otherwise, it returns the original value.
 * @param {number} value - The number to constrain within the range.
 * @param {number} [max=100] - The maximum value of the range (default is 100).
 * @param {number} [min=0] - The minimum value of the range (default is 0).
 * @returns {number} - The constrained number within the specified range.
 */
export function constrainNumber(
  value: number,
  max: number = 100,
  min: number = 0
): number {
  if (value <= min) return min;
  if (value >= max) return max;
  return value;
}

