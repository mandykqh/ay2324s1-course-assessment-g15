[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/6BOvYMwN)
# PeerPrep

## How to setup locally
### Backend
1. Edit docker-compose to add a connection string to `MONGOURL`
2. Start Docker and run `docker-compose up --build` (If developing, always run with `--build`. the `--build` tag creates new images with code changes reflected). This should start the `user-service` and `question-service`.
3. Follow instructions in `/backend/matching-service/readme.md` to set up the matching service
4. Follow instructions in `/backend/collaboration-service/readme.md` to setup the collaboration service
### Frontend
1. Follow instructions in `/frontend/readme.md`