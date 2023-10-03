#!/bin/bash

MAIN_DIR="$(realpath "$(dirname "$0")"/..)"
DOCKER_COMPOSE_DIR="$MAIN_DIR/docker-compose"

if [[ $* == *--stop* ]]; then
    docker-compose -f "$DOCKER_COMPOSE_DIR/services/docker-compose-eticket-ipfs-uploader.yaml" down
    exit $?
fi

if [[ $* != *--no-build* ]]; then
    if ! sh -c "$MAIN_DIR/workspace/eticket-ipfs-uploader/scripts/build.sh"; then
        echo failed to build eticket-ipfs-uploader
        exit 1
    fi
fi

docker-compose -f "$DOCKER_COMPOSE_DIR/services/docker-compose-eticket-ipfs-uploader.yaml" down
docker-compose -f "$DOCKER_COMPOSE_DIR/services/docker-compose-eticket-ipfs-uploader.yaml" up -d --force-recreate --no-deps --build eticket_ipfs_uploader

if [[ $(docker images --filter "dangling=true" -q | wc -l) != 0 ]]; then
    # shellcheck disable=SC2046
    docker image rm $(docker images --filter "dangling=true" -q)
fi
