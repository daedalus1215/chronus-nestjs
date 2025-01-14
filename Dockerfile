# Stage 1: Build
FROM node:20-alpine as build

ARG WORK_DIR=/usr/src/app
WORKDIR $WORK_DIR

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --prefer-offline --no-audit --no-fund

# Copy the rest of the source code
COPY . .

# Build the project
RUN npm run build

# Stage 2: Run
FROM node:20-alpine

ARG WORK_DIR=/usr/src/app
ENV NODE_ENV=production
WORKDIR $WORK_DIR

# Copy built files from the build stage
COPY --from=build $WORK_DIR/dist ./dist
COPY package*.json ./

RUN npm ci --only=production --prefer-offline --no-audit --no-fund

USER node

EXPOSE 3000
CMD ["node", "dist/main.js"]
