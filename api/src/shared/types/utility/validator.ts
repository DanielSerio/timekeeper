import { type ZodSchema } from 'zod';

export interface EntityValidator<
  Create, Update, Delete
> {
  create: ZodSchema<Create>;
  update: ZodSchema<Update>;
  delete: ZodSchema<Delete>;
}