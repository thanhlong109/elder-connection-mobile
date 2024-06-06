interface ApiResponse<T> {
  result: T;
  status: number;
  message: string;
}

interface PaggingResponse<T> {
  totalItemCount: number;
  pageSize: number;
  totalPagesCount: number;
  pageIndex: number;
  next: boolean;
  previous: boolean;
  items: T[];
}

interface PaggingRequest<T> {
  pageSize: number;
  pageIndex: number;
  data: T;
}
