# Set the base image to Ubuntu
FROM node:alpine
# FROM ckingdev/alpine-arm-node

RUN apk add --update nginx bash git openssh && \
  rm -rf /var/cache/apk/*

RUN mkdir -p /run/nginx \
  && mkdir -p /src \
  && mkdir /src/js \
  && mkdir /src/css

RUN npm install -g bower
ADD bower.json /tmp/bower.json

# Install TODO: Remove bower
RUN cd /tmp && bower install --allow-root || true
COPY default.conf /etc/nginx/conf.d/
RUN cp -r /tmp/bower_components /src

# COPY nginx/nginx.conf /etc/nginx/nginx.conf
# COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY index.html /src/
ADD js /src/js/
ADD css /src/css/

EXPOSE 3001

CMD ["nginx", "-g", "daemon off;"]
