[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/6BOvYMwN)
# PeerPrep

## How to setup locally
### Requirements
- Docker must be installed and running

1. Copy '.env.sample' and rename it as '.env'
2. Edit `.env' to fill in the environmental variables.
3. Start Docker and run `docker-compose up --build` (If developing, always run with `--build`. the `--build` tag creates new images with code changes reflected).
4. Delete dangling images from your docker images repository.
5. Access the app through http://localhost/

## Port mappings:
- Frontend: 5173
- Collaboration service: 4000
- Question service: 8080
- User service: 5000 for endpoint, 5432 for postgres container
- Matching Service: 3000 for endpoint, 5672 & 15672 for rabbitMQ container
- History Service: 7000