# How to setup (default local postgres user-db):
1. Edit docker-compose.yml file
2. To connect to mongodb questiondb for question-service, edit the following env variable in the file:
- `MONGOURL`: mongodb connection string
3. Run docker-compose up

# setup for cloud postgres user-db:
1. To connect to elephantsql user database, edit the following env variable in the file:
- `POSTGRESURL`: postgres connection string
2. Edit dbConfig file in backend/user-service/src/db so that sequelize uses the connection string.
3. Run docker-compose up