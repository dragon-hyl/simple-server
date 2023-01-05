import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface data<T> {
  data: T;
}

@Injectable()
export class ResponseInterceptor<T = any> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<data<T>> {
    // return next.handle();
    return next.handle().pipe(
      map((data) => {
        return {
          data,
          status: 200,
          success: true,
          msg: '操作成功',
        };
      }),
    );
  }
}
