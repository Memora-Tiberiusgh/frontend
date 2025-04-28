FROM node:23-alpine3.20

WORKDIR /frontend

COPY package*.json ./

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
