export function pad<Val extends string | number>(val: Val, count: number = 2) {
  return `${val}`.padStart(count, '0');
}