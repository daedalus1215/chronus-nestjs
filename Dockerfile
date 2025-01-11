# Build Stage
FROM node:20-alpine AS build

ARG WORK_DIR=/usr/src/app
WORKDIR $WORK_DIR

# Install dependencies and build
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Runtime Stage
FROM node:20-alpine

ARG WORK_DIR=/usr/src/app
ENV PORT=443
WORKDIR $WORK_DIR

# Copy built files and install production dependencies
COPY --from=build $WORK_DIR/dist ./dist
COPY --from=build $WORK_DIR/package*.json ./
COPY --from=build $WORK_DIR/node_modules ./node_modules

# Ensure correct ownership and permissions
RUN chown -R node:node $WORK_DIR
USER node

EXPOSE 443
CMD ["node", "-r", "tsconfig-paths/register", "dist/main"]
