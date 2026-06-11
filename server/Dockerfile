FROM node:18-alpine
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci --only=production || npm install --production

# Copy server files
COPY server ./server

ENV NODE_ENV=production
EXPOSE 4000
CMD ["node", "server/index.cjs"]
