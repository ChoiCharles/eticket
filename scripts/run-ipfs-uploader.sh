#!/bin/bash

WORKSPACE="./workspace"
DOCKER_COMPOSE="./docker-compose"

if [[ $(pwd) = .+/scripts$ ]]; then
    cd .. || exit 1
fi

if [[ $* == *--stop* ]]; then
    docker-compose -f "$DOCKER_COMPOSE/services/docker-compose-ipfs-uploader.yaml" down
    exit $?
fi

if ! [[ $* != *--no-build* ]]; then
    if ! sh "$WORKSPACE/blockchain-ipfs-uploader"; then
        echo failed to build blockchain-ipfs-uploader
        exit 1
    fi
fi

docker-compose -f "$DOCKER_COMPOSE/services/docker-compose-ipfs-uploader.yaml" down
docker-compose -f "$DOCKER_COMPOSE/services/docker-compose-ipfs-uploader.yaml" up -d --force-recreate --no-deps --build eticket_ipfs_uploader

if [[ $(docker images --filter "dangling=true" -q | wc -l) != 0 ]]; then
    docker image rm  "$(docker images --filter "dangling=true" -q)"
fi
