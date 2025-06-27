import { ListSorting } from "#shared/types/request/list.request-types";
import { Filter, Sort } from "typeorm";

export class RequestHelpers {
  private static getIntWithFallback(key: string, params: URLSearchParams, fallback: number = 0) {
    const valueStr = params.get(key);

    if (valueStr === null || isNaN(+valueStr)) {
      return fallback;
    }

    return ~~+valueStr;
  }

  private static getDecodedValue(key: string, params: URLSearchParams) {
    const encoded = params.get(key);

    if (encoded === null) {
      return null;
    }

    return decodeURIComponent(encoded);
  }


  private static getPagingFromUrl(params: URLSearchParams) {
    const limit = this.getIntWithFallback('limit', params, 25);
    const offset = this.getIntWithFallback('offset', params);

    return {
      limit,
      offset
    };
  }

  private static getSortingFromUrl(params: URLSearchParams): ListSorting | null {
    const decoded = this.getDecodedValue('sort', params);

    if (!decoded) {
      return null;
    }

    return JSON.parse(decoded);
  }

  private static getFilteringFromUrl<Ent>(params: URLSearchParams): Filter<Ent>[] | null {
    const decoded = this.getDecodedValue('sort', params);

    if (!decoded) {
      return null;
    }

    return JSON.parse(decoded);
  }

  public static getListRequestParams<Ent>(url: string) {
    const urlObject = new URL(url.startsWith('/') ? `http://localhost:3000${url}` : url);
    const params = urlObject.searchParams;

    return {
      paging: this.getPagingFromUrl(params),
      sorting: this.getSortingFromUrl(params),
      filtering: this.getFilteringFromUrl<Ent>(params)
    };
  }
}