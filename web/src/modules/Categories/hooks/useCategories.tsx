import type { CategoryRecord } from "#core/types/models/category.model-types";
import type {
  ListResponse,
  PagingRequest,
} from "#core/types/response/app.response-types";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export function useCategories() {
  const [count, setCount] = useState(0);
  const pagingController = useState<PagingRequest>({
    limit: 25,
    offset: 0,
  });
  const [{ limit, offset }] = pagingController;

  const fetchData = async () => {
    const response = await fetch(
      `http://localhost:3000/categories?limit=${limit}&offset=${offset}`
    );
    const data = (await response.json()) as ListResponse<CategoryRecord>;

    setCount(data.paging.totals.records);

    return data;
  };

  return {
    count,
    pagingController,
    query: useQuery({
      queryKey: ["mock", "categories"],
      async queryFn() {
        return await fetchData();
      },
    }),
  };
}
