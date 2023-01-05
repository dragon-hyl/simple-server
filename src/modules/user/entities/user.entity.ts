// 用户的实体
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BeforeInsert,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcryptjs';
// import { Role } from '@/modules/role/entities/role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid', { comment: '用户id' }) // 自增
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  username: string;

  @Exclude()
  @Column({ select: false, nullable: true })
  password: string;

  @Column({ name: 'phone_number', comment: '电话号码', default: null })
  phoneNumber: string;

  @Column({ default: null })
  avatar: string; // 头像

  @Column({ default: null })
  email: string;

  // @Column('simple-enum', {
  //   enum: ['root', 'author', 'visitor'],
  //   default: 'visitor',
  // })
  // role: string; // 用户角色
  // @ManyToOne(() => Role, (role) => role.users)
  // role: Role;

  @CreateDateColumn({ name: 'create_date', comment: '创建时间' })
  createDate: Date;

  @UpdateDateColumn({ name: 'update_date', comment: '更新时间' })
  updateDate: Date;

  @BeforeInsert() // 表示该方法在数据插入之前调用，这样就能保证插入数据库的密码都是加密后的
  encryptPwd() {
    if (!this.password) return;
    this.password = bcrypt.hashSync(this.password, 10);
  }
}
