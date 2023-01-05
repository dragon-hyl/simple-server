import { Strategy, IStrategyOptions } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compareSync } from 'bcryptjs';
import { User } from '../../user/entities/user.entity';

//本地策略
//PassportStrategy接受两个参数：
//第一个：Strategy，你要用的策略，这里是passport-local，本地策略
//第二个：别名，可选，默认是passport-local的local，用于接口时传递的字符串
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    // 如果不是username、password， 在constructor中配置
    super({
      usernameField: 'username',
      passwordField: 'password',
    } as IStrategyOptions);
  }

  //validate是LocalStrategy的内置方法
  async validate(username: string, password: string) {
    //查询数据库，验证账号密码，并最终返回用户
    // 因为密码是加密后的，没办法直接对比用户名密码，只能先根据用户名查出用户，再比对密码
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.username=:username', { username })
      .getOne();

    if (!user) {
      throw new BadRequestException('用户名不正确！');
    }

    if (!compareSync(password, user.password)) {
      throw new BadRequestException('密码错误！');
    }

    return user;
  }
}
