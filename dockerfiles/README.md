# How to setup (default local postgres user-db):
1. Edit docker-compose.yml file
2. To connect to mongodb questiondb for question-service, edit the following env variables in the file:
- `MONGOURL`: mongodb connection string for user service
- `MONGOURL`: mongodb connection string for ques service
3. Run docker-compose up
