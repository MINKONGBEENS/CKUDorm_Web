export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  pagination?: {
    total: number;
    currentPage: number;
    itemsPerPage: number;
    totalPages: number;
  };
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    total: number;
    currentPage: number;
    itemsPerPage: number;
    totalPages: number;
  };
} 