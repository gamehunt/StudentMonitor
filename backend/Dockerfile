FROM node:16-slim as build

WORKDIR /usr/local/site/shared
COPY shared/package.json /usr/local/site/shared/
RUN npm install
COPY shared/ /usr/local/site/shared/
RUN npm run build

WORKDIR /usr/local/site/backend
COPY package*.json /usr/local/site/backend/
RUN npm install
COPY . /usr/local/site/backend

RUN echo PROD=1 > .env

EXPOSE 3000
CMD ["npm", "start"]