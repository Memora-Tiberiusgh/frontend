FROM node:22-alpine AS build

WORKDIR /frontend

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Production stage - serve with Node.js
FROM node:22-alpine

# Install serve as root first
RUN npm install -g serve

# Then create user and switch
RUN addgroup -S nodejs && adduser -S nodejs -G nodejs

WORKDIR /frontend

RUN chown -R nodejs:nodejs /frontend

USER nodejs

# Copy built files from build stage
COPY --from=build --chown=nodejs:nodejs /frontend/dist ./dist

EXPOSE 3000

# Serve the built files
CMD ["serve", "-s", "dist", "-l", "3000"]