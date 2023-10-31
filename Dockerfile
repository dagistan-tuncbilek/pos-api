# For ubuntu vs linux systems, but first build app, npm run build
FROM node:18.16.1-slim
RUN apt update && apt install libssl-dev dumb-init -y --no-install-recommends
WORKDIR /app
COPY --chown=node:node node_modules ./node_modules
COPY --chown=node:node tsconfig*.json ./
COPY --chown=node:node package.json ./
COPY --chown=node:node prisma ./prisma/
COPY --chown=node:node dist/apps/seacollect-api ./dist
USER node
EXPOSE 3000
CMD ["dumb-init", "node", "dist/main"]


## Non Linux systems build (Mac vs.), disable .dockerignore node_modules and dist
#FROM node:18.16.0 AS builder
#WORKDIR /app
#COPY package.json ./
#RUN npm install
#COPY prisma ./prisma/
#COPY . .
#RUN npx prisma generate
#RUN npm run build
#
#FROM node:18.16.0-slim
#RUN apt update && apt install libssl-dev dumb-init -y --no-install-recommends
#WORKDIR /app
#COPY --chown=node:node --from=builder /app/dist/apps/seacollect-api ./dist
#COPY --chown=node:node --from=builder /app/tsconfig*.json ./
#COPY --chown=node:node --from=builder /app/package.json ./
#COPY --chown=node:node --from=builder /app/package-lock.json .
#RUN npm install --omit=dev
#COPY --chown=node:node --from=builder /app/node_modules/.prisma/client  ./node_modules/.prisma/client
#USER node
#EXPOSE 3000
#CMD ["dumb-init", "node", "dist/main"]
