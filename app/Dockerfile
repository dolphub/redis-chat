# Set the base image to Ubuntu
FROM    node:alpine

# Install git
# TODO: Remove this, only required for bower
RUN apk add --no-cache bash git openssh

# Install nodemon
RUN npm install -g nodemon
RUN npm install -g bower

# Copy npm package
ADD package.json /tmp/package.json

# TODO: Conver to webpack
ADD bower.json /tmp/bower.json

# Install TODO: Remove bower
RUN cd /tmp && npm install && bower install --allow-root || true
RUN mkdir -p /src \
    && cp -a /tmp/node_modules /src/ \
    && cp -a /tmp/bower_components /src/

RUN mkdir -p /src/server
RUN mkdir -p /src/client
ADD server /src/server/
ADD client /src/client/

# Define working directory
WORKDIR /src

EXPOSE 3001

# Run app using nodemon
CMD ["nodemon", "server/index.js"]
