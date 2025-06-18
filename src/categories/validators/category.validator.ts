import { CategoryCreate, CategoryRecord, CategoryUpdate } from "#shared/types/models/category.model-types";
import { EntityValidator } from "#shared/types/utility";
import { z } from "zod";

export class CategoryValidator implements EntityValidator<
  CategoryCreate,
  CategoryUpdate,
  { id: number; }
> {
  private _COMMON = {
    name: z.string().trim().min(1).max(64)
  };

  CREATE = z.object({
    name: this._COMMON.name
  });

  UPDATE = z.object({
    name: this._COMMON.name
  });

  DELETE = z.object({
    id: z.number()
  });
}