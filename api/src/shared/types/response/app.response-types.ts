import { Filter, Sort } from "typeorm";
import { PagingBasis } from "../request/paging.request.types";

export interface ApiInfo {
  at: Date;
  system: string;
  host: string;
}

export interface PagingTotals {
  [k: string]: number;
  records: number;
  pages: number;
}

export interface PagingResponse extends PagingBasis {
  totals: PagingTotals;
}

export interface ListResponse<Ent> {
  paging: PagingResponse;
  sorting: Sort | null;
  filtering: Filter<Ent> | null;
  records: Ent[];
}