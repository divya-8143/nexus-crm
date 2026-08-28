# Multi-stage Dockerfile for NexusCRM Platform
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests
COPY package.json ./
COPY shared/package.json ./shared/
COPY backend/package.json ./backend/
COPY frontend/package.json ./frontend/

# Install dependencies
RUN npm --prefix shared install
RUN npm --prefix backend install
RUN npm --prefix frontend install

# Copy source code
COPY . .

# Build application packages
RUN npm run build

# Production Runner Stage
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app ./

EXPOSE 3000
EXPOSE 5000

CMD ["npm", "start"]
