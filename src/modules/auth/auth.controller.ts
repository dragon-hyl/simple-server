import {
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Body,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('登录模块')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 登录测试
  @Post('login')
  @ApiOperation({ summary: '登录' })
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('local')) //本地策略，传递local，执行local里面的validate方法
  @UseInterceptors(ClassSerializerInterceptor)
  async login(@Body() user: LoginDto, @Req() req: Request) {
    //通过req可以获取到validate方法返回的user，传递给login，登陆
    return this.authService.login(req.user);
  }

  // 测试登录后才可访问的接口，在需要的地方使用守卫，可保证必须携带token才能访问
  // @Get('user')
  // @UseGuards(AuthGuard('jwt')) //jwt策略，身份鉴权
  //通过req获取到被验证后的user，也可以使用装饰器
  // getProfile(@Request() req) {
  //   console.log('req', req.user);
  //   return req.user;
  // }
}
