import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { User } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';

/**
 * jwtModule 模块
 */
const jwtModule = JwtModule.register({
  secret: 'junGle123',
  signOptions: { expiresIn: '1h' },
});

// @Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    jwtModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [jwtModule],
})
export class AuthModule {}
