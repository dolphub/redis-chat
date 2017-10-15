# Set the base image to Ubuntu
FROM    ubuntu
# FROM  armv7/armhf-ubuntu

# Update the repository and install Redis Server
RUN apt-get update && apt-get install -y redis-server

RUN sed -i 's/protected-mode\ yes/protected-mode\ no/' /etc/redis/redis.conf
RUN cat /etc/redis/redis.conf | grep protected-mode

# Expose Redis port 6379
EXPOSE  6379

# Run Redis Server
ENTRYPOINT  ["/usr/bin/redis-server", "--protected-mode", "no"]