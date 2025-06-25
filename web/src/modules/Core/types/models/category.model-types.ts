import type { Pretty } from "../utility";

interface CategoryCreateBase {
  name: string;
}

interface CategoryUpdateBase extends CategoryCreateBase { }
interface CategoryRecordBase extends CategoryCreateBase {
  id: number;
  createdAt: Date;
  lastUpdatedAt: Date | null;
}

export type CategoryCreate = Pretty<CategoryCreateBase>;
export type CategoryUpdate = Pretty<CategoryUpdateBase>;
export type CategoryRecord = Pretty<CategoryRecordBase>;