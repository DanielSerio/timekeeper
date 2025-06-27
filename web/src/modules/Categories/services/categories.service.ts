import { ApiService } from "#core/services/api.service";
import type { CategoryCreate, CategoryRecord, CategoryUpdate } from "#core/types/models/category.model-types";
import type { ListResponse } from "#core/types/response/app.response-types";

export interface ListCategoriesProps {
  limit: number;
  offset: number;
}

class CategoriesServiceCtor extends ApiService {
  async listCategories({ limit, offset }: ListCategoriesProps): Promise<ListResponse<CategoryRecord>> {
    const response = await this.GET(`/categories?limit=${limit}&offset=${offset}`);

    return await response.json() as ListResponse<CategoryRecord>;
  }

  async createCategory(body: CategoryCreate) {
    const response = await this.POST('/categories', {
      body: JSON.stringify(body)
    });

    return await response.json();
  }

  async updateCategory(id: number, body: CategoryUpdate) {
    const response = await this.PATCH(`/categories/${id}`, {
      body: JSON.stringify(body)
    });

    return await response.json();
  }

  async deleteCategories(ids: number[]) {
    const response = await this.PATCH('/categories/delete', {
      body: JSON.stringify(ids)
    });

    return await response.json();
  }
}

export const CategoriesService = new CategoriesServiceCtor();