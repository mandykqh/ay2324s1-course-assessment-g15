import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize({
  database: process.env.PG_DB,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST, // This should match the service name in the Docker Compose file
  dialect: 'postgres',
});

export { sequelize };