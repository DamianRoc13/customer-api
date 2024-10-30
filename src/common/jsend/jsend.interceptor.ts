import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  import { JSendUtil } from './jsend.util';
  
  @Injectable()
  export class JSendInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      return next.handle().pipe(
        map(data => {
          // Si la respuesta ya está en formato JSend, la devolvemos tal cual
          if (data && data.status && ['success', 'fail', 'error'].includes(data.status)) {
            return data;
          }
          // Si no, la envolvemos en un formato success
          return JSendUtil.success(data);
        }),
      );
    }
  }