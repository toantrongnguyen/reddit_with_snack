FROM node:10

RUN mkdir -p /home/app

WORKDIR /home/app

USER root

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3030

# CMD ["npm", "start"]
