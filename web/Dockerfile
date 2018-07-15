# Set the base image to Ubuntu
FROM node:alpine
# FROM ckingdev/alpine-arm-node

# RUN apk add --update nginx bash git openssh && \
#   rm -rf /var/cache/apk/*

RUN mkdir -p /app


RUN npm install -g yarn

COPY index.js /app
COPY package.json /app
COPY yarn.lock /app
COPY public/ /app/public

WORKDIR /app
RUN yarn install

EXPOSE 3001

CMD ["yarn", "start"]
