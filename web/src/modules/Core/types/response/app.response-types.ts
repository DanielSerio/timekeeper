export interface ApiInfo {
  at: Date;
  system: string;
  host: string;
}

interface PagingBasis {
  limit: number;
  offset: number;
}

interface PagingTotals {
  pages: number;
  record: number;
}

export interface PagingRequest extends PagingBasis {
  [k: string]: number;
}

export interface PagingResponse extends PagingBasis {
  [k: string]: number | PagingTotals;
  totals: PagingTotals;
}


export interface ListResponse<RecordType> {
  paging: PagingResponse;
  records: RecordType[];
}