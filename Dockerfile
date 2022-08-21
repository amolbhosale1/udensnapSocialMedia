FROM node:16-alpine3.14 AS client

WORKDIR /usr/src/client/

COPY client/package*.json .

RUN npm i

COPY client .

RUN npm run build

FROM node:16-alpine3.14

WORKDIR /usr/src/app/

COPY --from=client /usr/src/client/build/ ./client/build/

COPY package*.json .

RUN npm i 

COPY . .

ENV PORT=3000

EXPOSE 3000
# EXPOSE 443

CMD ["npm", "start"]