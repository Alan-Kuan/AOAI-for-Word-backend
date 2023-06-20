FROM node:18-alpine AS build
RUN npm install -g pnpm
COPY frontend frontend
WORKDIR /frontend
RUN pnpm install
RUN pnpm build

FROM node:18-alpine AS runtime
RUN npm install -g pnpm
WORKDIR /app
COPY --from=build /frontend/dist ./dist
COPY ./lib ./lib
COPY ./server.js ./
COPY ./package.json ./
COPY ./pnpm-lock.yaml ./
RUN pnpm install

RUN mkdir views
RUN sed 's/src="\/main\.js"/src="\/main.js?code=<%- code %>"/' dist/index.html > views/index.ejs

EXPOSE 80
CMD ["node", "server.js"]