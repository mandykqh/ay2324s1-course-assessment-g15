FROM node:latest
WORKDIR /app
COPY backend/matching-service/package*.json ./
RUN npm install
COPY backend/matching-service/. .
EXPOSE 3000
CMD ["npm", "start"]