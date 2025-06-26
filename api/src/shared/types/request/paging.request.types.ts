export interface PagingBasis {
  limit: number;
  offset: number;
}

export interface PagingRequest extends PagingBasis {
  [k: string]: number;
}