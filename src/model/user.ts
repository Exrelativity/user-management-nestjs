import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Default,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table
export class User extends Model {
  @ApiProperty()
  @IsUUID(4)
  @PrimaryKey
  @Column
  id: string;

  @Column
  @ApiProperty()
  username!: string;

  @Column
  password!: string;

  @ApiProperty()
  @Default(false)
  @Column
  isEmailVerified: boolean;

  @ApiProperty()
  @Column
  email!: string;
}
