FROM node:22-alpine AS build

RUN addgroup -S nodejs && adduser -S nodejs -G nodejs

WORKDIR /frontend

RUN chown -R nodejs:nodejs /frontend

USER nodejs

COPY --chown=nodejs:nodejs package*.json ./

RUN npm install

COPY --chown=nodejs:nodejs . .

EXPOSE 5173

CMD ["npm", "run", "dev"]