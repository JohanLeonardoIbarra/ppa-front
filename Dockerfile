FROM node:18-alpine as build

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

FROM httpd:2.4

COPY --from=build /app/dist/ppt-front /usr/local/apache2/htdocs/
