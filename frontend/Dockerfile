
FROM node:16-slim as build

RUN apt-get update && apt-get install -y python && apt-get install -y build-essential

WORKDIR /usr/local/site/shared
COPY shared/package.json /usr/local/site/shared/
RUN npm install
COPY shared/ /usr/local/site/shared/
RUN npm run build

WORKDIR /usr/local/site/frontend
COPY frontend/package*.json /usr/local/site/frontend/
RUN npm install
COPY frontend/ /usr/local/site/frontend/
RUN npm run build

FROM nginx:1.17.1
COPY --from=build /usr/local/site/frontend/dist/student-monitor-frontend /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80