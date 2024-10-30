import { JSendResponse } from './jsend.interface';
import { HttpException, HttpStatus } from '@nestjs/common';

export class JSendUtil {
  static success(data: any): JSendResponse {
    return {
      status: 'success',
      data,
    };
  }

  static fail(data: any): JSendResponse {
    return {
      status: 'fail',
      data,
    };
  }

  static error(message: string, code: number = HttpStatus.INTERNAL_SERVER_ERROR): JSendResponse {
    return {
      status: 'error',
      message,
      code,
    };
  }

  // Método helper para manejar errores
  static handleError(error: any): never {
    if (error instanceof HttpException) {
      throw error;
    }
    throw new HttpException(
      this.error(error.message || 'Internal server error'),
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}