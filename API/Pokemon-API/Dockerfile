FROM node:18.17.1

WORKDIR /kikiDev/src/pokemon

COPY package.json /kikiDev/src/pokemon/
RUN npm install --quiet

COPY . /kikiDev/src/pokemon/

EXPOSE 3001

CMD npm run start:dev