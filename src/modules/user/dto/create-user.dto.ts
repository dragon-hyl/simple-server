import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'jungle', description: '用户名' })
  @IsNotEmpty({ message: '用户名不能为空' }) // 验证是否为空
  @IsString() // 是否为字符串
  username: string;

  @ApiProperty({ example: '123456', description: '密码' })
  @IsNotEmpty({ message: '密码不能为空' })
  @IsString()
  @MinLength(6, {
    message: '密码长度不能小于6位',
  })
  @MaxLength(20, {
    message: '密码长度不能超过20位',
  })
  password: string;
}
