import { CategoryCreate, CategoryRecord, CategoryUpdate } from "#shared/types/models/category.model-types";
import { EntityValidator } from "#shared/types/utility";
import { z, ZodSchema } from "zod";

export class CategoryValidator implements EntityValidator<
  CategoryCreate,
  CategoryUpdate,
  { id: number; }
> {
  [k: string]: object | ZodSchema<CategoryCreate | CategoryUpdate | { id: number; }>;
  private _COMMON = {
    name: z.string().trim().min(1, 'Name is required').max(64, `Name is too long (max 64)`)
  };

  create = z.object({
    name: this._COMMON.name
  });

  update = z.object({
    name: this._COMMON.name
  });

  delete = z.object({
    id: z.number().int().positive()
  });
}