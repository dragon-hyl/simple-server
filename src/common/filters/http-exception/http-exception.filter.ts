import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 获取请求上下文
    const request = ctx.getRequest<Request>(); // 获取请求上下文中的 request 对象
    const response = ctx.getResponse<Response>(); // 获取请求上下文中的 response 对象
    const status = exception.getStatus()
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR; // 获取异常状态码

    response.status(status).json({
      path: request.url,
      method: request.method,
      status,
      success: false,
      data: exception.message,
      time: new Date().getTime(),
    });

    // response.header('Content-Type', 'application/json; charset=utf-8');
  }
}
