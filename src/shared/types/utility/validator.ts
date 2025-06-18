import { type ZodSchema } from 'zod';

export interface EntityValidator<
  Create, Update, Delete
> {
  CREATE: ZodSchema<Create>;
  UPDATE: ZodSchema<Update>;
  DELETE: ZodSchema<Delete>;
}