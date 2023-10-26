FROM node:latest
WORKDIR /app
COPY frontend/package*.json ./
RUN npm i
COPY frontend/. .
EXPOSE 5173
CMD ["npm", "run", "dev"]