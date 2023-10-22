import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db/dbConfig';

class User extends Model {
  declare id: number;
  declare username: string;
  declare email: string;
  declare password: string;
  declare role: 'ADMIN' | 'USER';
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      unique: {
        name: 'username',
        msg: 'Username already exists',
      },
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        name: 'email',
        msg: 'Email already exists',
      },
      validate: {
        isEmail: {
          msg: 'Please enter a valid email address',
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('ADMIN', 'USER'),
      allowNull: false,
      validate: {
        isIn: {
          args: [['ADMIN', 'USER']],
          msg: 'Role must be either ADMIN or USER.',
        },
      }
    },
  },
  {
    tableName: 'User',
    sequelize,
  }
);

export default User;
