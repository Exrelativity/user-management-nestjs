// import { v4 as uuidv4 } from 'uuid';
// import { DataTypes, Model, Optional } from 'sequelize';
// import sequelizeConnection from '../database/config';

// interface UserAttributes {
//   readonly id: string;

//   username: string;

//   password: string;

//   isEmailVerified: boolean;

//   email: string;

//   createdAt?: Date;

//   updatedAt?: Date;

//   deletedAt?: Date;
// }

// export interface UserInput
//   extends Optional<UserAttributes, 'id' | 'username' | 'email'> {}
// export interface UserOutput extends Required<UserAttributes> {}

// class User extends Model<UserAttributes, UserInput> implements UserAttributes {
//   public id!: string;
//   public username!: string;
//   public password!: string;
//   public isEmailVerified!: boolean;
//   public email!: string;
//   // timestamps!
//   public readonly createdAt!: Date;
//   public readonly updatedAt!: Date;
//   public readonly deletedAt?: Date;
// }

// User.init(
//   {
//     id: {
//       type: DataTypes.UUID,
//       primaryKey: true,
//       defaultValue: uuidv4(),
//     },
//     username: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     isEmailVerified: {
//       type: DataTypes.BOOLEAN,
//       allowNull: false,
//       defaultValue: false,
//     },
//   },
//   {
//     timestamps: true,
//     sequelize: sequelizeConnection,
//     paranoid: true,
//   },
// );

// export default User;
