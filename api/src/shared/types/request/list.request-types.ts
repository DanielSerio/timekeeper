import { PagingRequest } from "./paging.request.types";
import { Sort, Filter, SortDirection } from 'typeorm';

export type ListSorting = Sort & {
  [key: string]: SortDirection;
};

export interface ListRequest<Ent> {
  paging?: PagingRequest;
  sorting?: ListSorting;
  filtering?: Filter<Ent>[];
}