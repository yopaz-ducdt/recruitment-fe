export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ApiErrorResponse {
  code: string;
  message: string;
  fields?: Record<string, string>;
}

export interface MessageResponse {
  message: string;
}
