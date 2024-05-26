interface ApiResponse<T> {
  result: T;
  status: number;
  message: string;
}
