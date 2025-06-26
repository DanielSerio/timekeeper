import type { CategoryRecord } from "#core/types/models/category.model-types";
import type { ListResponse } from "#core/types/response/app.response-types";

import { useQuery } from "@tanstack/react-query";

export function useCategories() {
  return useQuery({
    queryKey: ["mock", "categories"],
    async queryFn() {
      // return await new Promise<ListResponse<CategoryRecord>>((resolve) => {
      //   setTimeout(() => {
      //     resolve({
      //       paging: {
      //         limit: 25,
      //         offset: 0,
      //         totals: {
      //           pages: 1,
      //           record: MOCK_CATEGORIES.length,
      //         },
      //       },
      //       records: MOCK_CATEGORIES,
      //     });
      //   }, 500);
      // });

      const response = await fetch(`http://localhost:3000/categories`);
      return (await response.json()) as ListResponse<CategoryRecord>;
    },
  });
}
