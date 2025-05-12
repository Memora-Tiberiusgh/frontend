FROM node:22-alpine AS build

WORKDIR /frontend

COPY package*.json ./

RUN npm install

COPY . .

RUN addgroup -S nodejs && adduser -S nodejs -G nodejs

USER nodejs

EXPOSE 5173

CMD ["npm", "run", "dev"]