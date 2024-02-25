/**
 * Checks if a value is a valid date
 * @param {unknown} value value to check
 * @returns {boolean} isDate
 */
export function isValidDate(value: unknown): value is Date {
  const acceptable = ["string", "number", "object"];

  const isValidDate = (d: Date) =>
    d.toString().toLowerCase() !== "invalid date";

  if (!acceptable.includes(typeof value)) return false;
  if (typeof value === "object" && value !== null) {
    if (typeof (value as Date).getFullYear !== undefined) {
      return isValidDate(value as Date);
    }
    return false;
  } else {
    const date = new Date(value as string | number);
    return isValidDate(date);
  }
}

