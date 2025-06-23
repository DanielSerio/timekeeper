FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

# Source code will be mounted via volume, so no COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]