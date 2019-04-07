FROM node:10

WORKDIR /home/app

USER root

ENV PORT 3030

EXPOSE 3030

CMD ["npm", "start"]
