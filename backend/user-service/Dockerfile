FROM node:latest
WORKDIR /app
COPY backend/user-service/package*.json ./
RUN npm ci
COPY backend/user-service/. .
CMD ["npm", "run", "dev"]
EXPOSE 5000