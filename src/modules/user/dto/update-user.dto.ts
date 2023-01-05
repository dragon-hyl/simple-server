import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import {
  MinLength,
  MaxLength,
  IsOptional,
  IsEmail,
  IsMobilePhone,
} from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ description: '用户名', example: 'kitty', required: false }) // 不是必选的
  @IsOptional()
  username: string;

  @ApiProperty({ description: '密码', example: '12345678', required: false })
  @IsOptional()
  @MinLength(6, {
    message: '密码长度不能小于6位',
  })
  @MaxLength(20, {
    message: '密码长度不能超过20位',
  })
  password: string;

  @ApiProperty({
    description: '邮箱',
    example: 'llovenest@163.com',
    required: false,
  })
  @IsOptional()
  @IsEmail({}, { message: '邮箱格式错误' })
  email: string;

  @ApiProperty({
    description: '手机号码',
    example: '13866668888',
    required: false,
  })
  @IsOptional()
  @IsMobilePhone('zh-CN', {}, { message: '手机号码格式错误' })
  phoneNumber: string;
}
