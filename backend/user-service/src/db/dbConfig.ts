import { Sequelize } from 'sequelize-typescript';

/*
#For connecting to elephant sql cloud db
const sequelize = new Sequelize(process.env.POSTGRESURL, {
  dialect: 'postgres',
});
*/

const sequelize = new Sequelize({
  database: process.env.PG_DB,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST, // This should match the service name in your Docker Compose file
  dialect: 'postgres',
});

export { sequelize };