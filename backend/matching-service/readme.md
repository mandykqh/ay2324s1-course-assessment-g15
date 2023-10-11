# To setup matching-service
1. Run `cd backend/matching-service`
2. Run `npm install` 
3. start docker daemon and run the following: 
`docker run -d -it --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.12-management`
4. Create a `.env` file in the matching-service folder, set variables `QUESTIONS_SERVICE_URL` and `COLLABORATION_SERVICE_URL` 
5. Run `npm start` 

# additional info
To view rabbitmq queues go to localhost:15672 and login:
username: guest
pw: guest