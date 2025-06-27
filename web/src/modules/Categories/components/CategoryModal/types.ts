import type { CategoryRecord } from "#core/types/models/category.model-types";

export interface CategoryFormPropsBasis {
  category?: CategoryRecord;
  onError: (error: Error) => void;
  onSuccess: () => void;
  dismiss: () => void;
}

export interface CreateCategoryFormProps extends CategoryFormPropsBasis {
  category?: never;
}

export interface UpdateCategoryFormProps extends CategoryFormPropsBasis {
  category: CategoryRecord;
}

export interface CategoryFormProps extends CategoryFormPropsBasis { }