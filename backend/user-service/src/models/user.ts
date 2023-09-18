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
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.ENUM('ADMIN', 'USER'),
    },
  },
  {
    tableName: 'User',
    sequelize,
  }
);

export default User;
