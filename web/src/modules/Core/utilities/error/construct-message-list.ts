import type { ZodError } from "zod";

export function constructMessageList<T>(error: ZodError<T>) {
  return error.issues.map((iss) => `${iss.path.join(',')}: ${iss.message}`).join('\n');
}