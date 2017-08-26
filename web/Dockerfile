# Set the base image to Ubuntu
FROM nginx:alpine

# Install git
# TODO: Remove this, only required for bower
RUN apk add --no-cache bash git openssh

# Install nodemon
RUN npm install -g bower

# TODO: Conver to webpack
ADD bower.json /tmp/bower.json

# Install TODO: Remove bower
RUN cd /tmp && bower install --allow-root || true
RUN mkdir -p /src \
    && cp -a /tmp/bower_components /src/

RUN mkdir -p /src/web
ADD . /src/web/

# Define working directory
WORKDIR /src

EXPOSE 80

# Run app using nodemon
# ENTRYPOINT
CMD ["service", "nginx", "start"]
