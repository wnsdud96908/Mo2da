import { DataTypes, Model, Sequelize } from 'sequelize';
import { CommunityComments } from './communityComments';

export interface UsersAttributes {
  userNum: number;
  id: string;
  password: string;
  name: string;
  nick: string;
  email: string;
  tel: string;
  age: number;
  grade: number;
  addr: string;
  gender: string;
}

export interface UsersCreationAttributes
  extends Omit<UsersAttributes, 'userNum'> {}

export class Users
  extends Model<UsersAttributes, UsersCreationAttributes>
  implements UsersAttributes
{
  public userNum!: number;
  public id!: string;
  public password!: string;
  public name!: string;
  public nick!: string;
  public email!: string;
  public tel!: string;
  public age!: number;
  public grade!: number;
  public addr!: string;
  public gender!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function usersModel(sequelize: Sequelize): typeof Users {
  Users.init(
    {
      userNum: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      id: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      nick: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      tel: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      grade: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      addr: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Users',
      tableName: 'users',
      timestamps: true,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'userNum' }],
        },
        {
          name: 'user_UN',
          unique: true,
          using: 'BTREE',
          fields: ['id'],
        },
        {
          name: 'user_UN1',
          unique: true,
          using: 'BTREE',
          fields: ['nick'],
        },
        {
          name: 'user_UN2',
          unique: true,
          using: 'BTREE',
          fields: ['email'],
        },
      ],
    }
  );

  return Users;
}
