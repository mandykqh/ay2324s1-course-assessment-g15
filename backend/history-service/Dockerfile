FROM node:latest
WORKDIR /app
COPY backend/history-service/package*.json ./
RUN npm install
COPY backend/history-service/. .
EXPOSE 7000
CMD ["npm", "start"]