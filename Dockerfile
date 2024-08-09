# Multi-stage

# Stage 1: Build the app
FROM node:20.5-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Stage 2: Create a lightweight production image
FROM node:20.5-alpine AS final_image
WORKDIR /app
EXPOSE 3000
COPY --from=builder /app/build ./
COPY package*.json ./
RUN npm install --omit=dev
CMD ["npm","run","start:prod"]