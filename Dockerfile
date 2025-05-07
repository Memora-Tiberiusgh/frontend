FROM node:23-alpine3.20 AS build

WORKDIR /frontend

COPY package*.json ./

RUN npm install

# Debug: List files in the build context before copying
RUN echo "Files in build context:"
COPY . .

# Debug: Check if vite.config.js exists after copying
RUN ls -la && echo "Checking for vite.config.js:" && ls -la vite.config.js || echo "vite.config.js NOT FOUND"

EXPOSE 5173

CMD ["npm", "run", "dev"]
