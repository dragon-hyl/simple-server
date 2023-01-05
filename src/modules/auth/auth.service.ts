import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  createToken(user: Partial<User>) {
    return this.jwtService.sign(user);
  }

  async login(user: Partial<User>) {
    // 把信息存在token;
    const token = this.createToken({
      id: user.id,
      username: user.username,
      role: user.role,
    });
    return {
      access_token: token, //返回token
    };
  }

  async getUser(user: Partial<User>) {
    return await this.userService.findOne(user.id);
  }

  isExpires(access) {
    return Date.now() - access.getTime > access.expiresIn * 1000;
  }
}
