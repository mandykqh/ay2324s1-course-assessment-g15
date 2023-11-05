import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize({
  database: "peerprep",
  username: "localuser",
  password: 12345,
  host: "user-db", // This should match the service name in the Docker Compose file
  dialect: 'postgres',
});

export { sequelize };