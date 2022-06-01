FROM node:latest

EXPOSE 9001

COPY package*json ./

RUN npm install

COPY . ./

RUN echo 'Done'

CMD [ "node", "server.js"]