export interface JSendResponse {
    status: 'success' | 'fail' | 'error';
    data?: any;
    message?: string;
    code?: number;
  }