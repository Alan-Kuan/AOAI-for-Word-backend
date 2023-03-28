FROM node:18-alpine AS build
RUN npm install -g pnpm
RUN apk update && apk upgrade && \
    apk add --no-cache git
RUN git clone --depth 1 https://github.com/Alan-Kuan/AOAI-for-Word
WORKDIR /AOAI-for-Word
RUN pnpm install
RUN pnpm build

FROM node:18-alpine AS runtime
RUN npm install -g pnpm
WORKDIR /app
COPY --from=build /AOAI-for-Word/dist /app/dist
COPY ./server.js /app
COPY ./package.json /app
COPY ./pnpm-lock.yaml /app
RUN pnpm install

EXPOSE 80
CMD ["node", "server.js"]