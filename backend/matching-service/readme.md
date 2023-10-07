# To setup matching-service
1. Run `cd backend/matching-service`
2. Run `npm install` 
3. start docker daemon and run the following: 
`docker run -d -it --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.12-management`
4. Run `npm start` 