[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/6BOvYMwN)
# PeerPrep

## How to setup locally
### Requirements
- Docker must be installed and running
### Backend
1. Copy `docker-compose.temp.yml` to a new file named `docker-compose.yml`. (do not edit `docker-compose.temp.yml` unless needed)
2. Edit `docker-compose.yml` to add a connection string to `MONGOURL` where required.
3. Start Docker and run `docker-compose up --build` (If developing, always run with `--build`. the `--build` tag creates new images with code changes reflected).
4. Remember to delete 

### Frontend
1. Follow instructions in `/frontend/readme.md`