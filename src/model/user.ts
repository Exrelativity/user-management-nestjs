import { Column, IsUUID, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table
export class User extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column
  id: string;

  @Column
  username!: string;

  @Column
  password!: string;

  @Column
  isEmailVerified!: boolean;

  @Column
  email!: string;
}
