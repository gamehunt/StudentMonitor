
FROM node:16-slim as build

WORKDIR /usr/local/site/frontend

COPY package*.json /usr/local/site/frontend/

RUN apt-get update && apt-get install -y python && apt-get install -y build-essential

RUN npm install

COPY . /usr/local/site/frontend/
RUN npm run build

FROM nginx:1.17.1
COPY --from=build /usr/local/site/frontend/dist/student-monitor-frontend /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80