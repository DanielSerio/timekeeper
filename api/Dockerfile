FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

# Source code will be mounted via volume, so no COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]