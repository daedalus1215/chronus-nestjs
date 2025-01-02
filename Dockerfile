# Build Stage
FROM node:20-alpine as build

ARG WORK_DIR=/usr/src/app
WORKDIR $WORK_DIR

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Runtime Stage
FROM node:20-alpine

ARG WORK_DIR=/usr/src/app
ENV PORT=3001
WORKDIR $WORK_DIR

COPY --from=build /usr/src/app/dist ./dist
COPY package*.json ./
RUN npm install --production

EXPOSE 3001
CMD ["node", "dist/main.js"]
