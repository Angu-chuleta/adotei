################################################################
# Install dev dependencies and build
################################################################
FROM node:14-alpine as builder

ADD . /app/service

WORKDIR /app/service

RUN npm install

RUN yarn build

################################################################
# Only install production dependencies
################################################################
FROM node:14-alpine as installer

RUN 	mkdir -p /app/service

WORKDIR /app/service

COPY --from=builder /app/service/package.json .
COPY --from=builder /app/service/package-lock.json .

RUN  npm install --production

################################################################
# Production container
################################################################
FROM node:14-alpine

RUN 	mkdir -p /app/service

WORKDIR /app/service

COPY --from=builder /app/service/package.json .
COPY --from=builder /app/service/dist ./dist
COPY --from=installer /app/service/node_modules ./node_modules

EXPOSE 3000

CMD ["yarn", "start"]
