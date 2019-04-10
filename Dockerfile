FROM node:10

RUN mkdir -p /home/app

WORKDIR /home/app

USER root

COPY package*.json ./

COPY . .

RUN npm install pm2 -g

EXPOSE 3030
