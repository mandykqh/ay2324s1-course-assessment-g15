# How to setup (default local postgres user-db):
1. Edit docker-compose.yml file
2. To connect to mongodb questiondb for question-service, edit the following env variable in the file:
- `MONGOURL`: mongodb connection string
3. Run docker-compose up
