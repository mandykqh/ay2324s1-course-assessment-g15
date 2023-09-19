import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize(process.env.POSTGRESURL, {
  dialect: 'postgres',
});

export { sequelize };