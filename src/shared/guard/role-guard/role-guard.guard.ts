import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { User } from '@/modules/user/entities/user.entity';

@Injectable()
export class RoleGuardGuard implements CanActivate {
  constructor(@Inject(Reflector) private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log(context);
    // 通过反射获取请求路由是否添加了 @Roles() 注解，如果没有添加，则代表不需要进行认证
    const roles = this.reflector.get<string>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    // 在请求对象中获取 user 对象，此 user 对象是 AuthStrategy 中 validate 方法成功执行后的返回值
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;
    // 判断当前请求用户的角色是否为管理员
    // const hasRole = () => user.role === 'root';
    // return user && hasRole();
    return true;
  }
}
