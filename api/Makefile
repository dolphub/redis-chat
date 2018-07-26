DOCKER_BIN ?= `which docker`
DOCKER_COMPOSE ?= `which docker-compose`
TAG ?= "dolphub/redischat-api:0.1.4"

.PHONY: build
build:
	$(DOCKER_BIN) build . -t $(TAG)

.PHONY: push
push:
	$(DOCKER_BIN) push $(TAG)

.PHONY: release
release: build push

.PHONY: run
run:
	$(DOCKER_COMPOSE) up