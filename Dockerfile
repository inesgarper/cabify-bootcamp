FROM node:latest

EXPOSE 9001

COPY exercise1/package*json ./

RUN npm install

COPY exercise1 ./

RUN echo 'Done'

CMD [ "node", "server.js"]