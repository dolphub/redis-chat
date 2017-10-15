# redis-chat
Sockets, Scaling and Technology Playground

## Set up local Registry for DockerSwarm
```
docker run -d -p 5000:5000 --restart=always --name registry registry:2
```

## To access this local registry you need to allow insecure registrys in your daemon config for your docker.  

### Ubuntu / Debian
Edit or create `/etc/docker/daemon.json` and add

```
{ "insecure-registries":["myregistry.example.com:5000"] }
```
with the URL of your customer regitry.

# Docker Cluster
## Create the swarm

```
docker swarm init --advertise-addr <MANAGER_IP>
```

## Push images to local regitry
To allow docker swarm to be deployed from a `docker-compose.yml` file we need to have our locally built images pushed to some registry to be referenced from.  This is where we use our local registry.

### Tag and push all images required
```
docker-compose build # Tags builds images for push
docker-compose push
```

### Or you can push individually
```
docker tag redischat_web:latest <ip>:5000/redis_web
docker push <ip>:5000/redis_web
```

Copy the token string and use to attach other nodes to this server

# TODO
### Running this app in cluster seems to not sticky session sockets

# Architecture

All Dockerfiles have their respective armv7 architecture next to base image
