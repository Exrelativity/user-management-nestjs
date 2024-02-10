import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Default,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
@Table
export class User extends Model {
  @ApiProperty()
  @Default(uuidv4())
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
