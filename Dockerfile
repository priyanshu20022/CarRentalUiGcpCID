FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./

RUN npm install

COPY . .
RUN npm run prod


FROM nginx:alpine
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/ui-layer /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]