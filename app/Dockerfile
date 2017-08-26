# Set the base image to Ubuntu
FROM    node:alpine

# Install nodemon
RUN npm install -g nodemon
RUN npm install -g bower

ADD package.json /tmp/package.json
# ADD bower.json /tmp/bower.json
RUN cd /tmp && npm install
RUN mkdir -p /src && cp -a /tmp/node_modules /src/

ADD server/ /src/

# Define working directory
WORKDIR /src
# Run app using nodemon
CMD ["nodemon", "server/index.js"]