import { CategoryCreate } from "src/shared/types/models/category.model-types";


export class CreateCategoryDto implements CategoryCreate {
  name: string;
}
