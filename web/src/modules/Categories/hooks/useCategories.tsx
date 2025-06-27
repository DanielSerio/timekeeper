import type { CategoryRecord } from "#core/types/models/category.model-types";
import type {
  ListResponse,
  PagingRequest,
} from "#core/types/response/app.response-types";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export function useCategories() {
  const [count, setCount] = useState(0);
  const paging = useState<PagingRequest>({
    limit: 25,
    offset: 0,
  });
  const [{ limit, offset }, setPaging] = paging;

  const fetchData = async () => {
    const response = await fetch(
      `http://localhost:3000/categories?limit=${limit}&offset=${offset}`
    );
    const data = (await response.json()) as ListResponse<CategoryRecord>;

    setCount(data.paging.totals.records);

    return data;
  };

  const goToFirst = () => setPaging((current) => ({ ...current, offset: 0 }));
  const goToNext = () =>
    setPaging((current) => ({
      ...current,
      offset: current.offset + current.limit,
    }));

  const goToPrev = () =>
    setPaging((current) => {
      if (current.offset >= current.limit) {
        return {
          ...current,
          offset: current.offset - current.limit,
        };
      }

      return current;
    });

  const goToLast = () =>
    setPaging((current) => {
      return {
        ...current,
        offset: Math.floor(count / current.offset) * current.limit,
      };
    });

  const changeRecordsPerPage = (perPage: number) =>
    setPaging({
      limit: perPage,
      offset: 0,
    });

  const methods = {
    goToFirst,
    goToLast,
    goToNext,
    goToPrev,
    changeRecordsPerPage,
  };

  return {
    count,
    pagingController: [paging[0], methods] as const,
    query: useQuery({
      queryKey: ["mock", "categories", `limit=${limit}`, `offset=${offset}`],
      async queryFn() {
        return await fetchData();
      },
    }),
  };
}
