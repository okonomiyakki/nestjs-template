import { Column, CreateDateColumn, Entity, Index, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TokenEntity } from '@core/type-orm/entities/token.entity';

@Index('UQ_IDX_user_nickname', ['nickname'], { unique: true })
@Index('UQ_IDX_user_email', ['email'], { unique: true })
@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    comment: 'User UUID (PK, NN)',
  })
  id!: string;

  @Column('varchar', {
    name: 'email',
    length: 50,
    nullable: false,
    comment: 'User Email (NN, UQ)',
  })
  email!: string;

  @Column('varchar', {
    name: 'password',
    length: 60,
    nullable: false,
    comment: 'User Password (NN)',
  })
  password!: string;

  @Column('varchar', {
    name: 'nickname',
    length: 10,
    nullable: false,
    comment: 'User Nickname (NN, UQ)',
  })
  nickname!: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    comment: 'User Creation Date (NN)',
  })
  createdAt!: Date;

  @OneToOne(() => TokenEntity, (token) => token.user)
  token!: TokenEntity;
}
