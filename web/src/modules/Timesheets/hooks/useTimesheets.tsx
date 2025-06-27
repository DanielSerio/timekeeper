import type { PagingRequest } from "#core/types/response/app.response-types";
import { TimesheetService } from "#timesheets/services/timesheet.service";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export function useTimesheets() {
  const [count, setCount] = useState(0);
  const paging = useState<PagingRequest>({
    limit: 25,
    offset: 0,
  });
  const [{ limit, offset }, setPaging] = paging;

  const fetchData = async () => {
    const data = await TimesheetService.listTimesheets({
      limit,
      offset,
    });

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
      queryKey: ["timesheets", "list", `limit=${limit}`, `offset=${offset}`],
      async queryFn() {
        return await fetchData();
      },
    }),
  };
}
