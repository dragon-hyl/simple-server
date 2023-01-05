import { SetMetadata } from '@nestjs/common';

/**
 * 自定义权限装饰器
 * @param roles
 * @returns
 */
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
