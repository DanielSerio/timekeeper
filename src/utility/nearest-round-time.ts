/**
 * Function to round a given date to the nearest 15-minute interval.
 * @param {Date} date - The date to be rounded.
 * @returns {Date} - The date rounded to the nearest 15-minute interval.
 */
export function nearestRoundTime(date: Date): Date {
  const min = date.getMinutes();
  if (min % 15 === 0) return date;
  const newMinutes = (Math.round(min / 15) * 15) % 60;
  date.setMinutes(newMinutes);

  return date;
}

