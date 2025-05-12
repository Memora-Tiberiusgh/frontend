FROM node:20-alpine AS build

WORKDIR /frontend

COPY package*.json ./
RUN npm install
COPY . .

# Alpine uses addgroup and adduser instead of groupadd and useradd
RUN addgroup -S nodejs && adduser -S nodejs -G nodejs

# Set the user properly on its own line
USER nodejs

EXPOSE 5173
CMD ["npm", "run", "dev"]