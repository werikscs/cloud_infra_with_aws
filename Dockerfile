# Multi-stage

# Stage 1: Build the app
FROM node:22-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build:clean && npm run build:transpile

# Stage 2: Create a lightweight production image
FROM node:22-alpine AS final_image
WORKDIR /app
COPY --from=builder /app/build ./build
COPY ./prisma ./prisma
COPY package*.json ./
RUN npm install --omit=dev
CMD ["npm", "run", "start:prod:container"]