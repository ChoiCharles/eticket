#!/bin/bash

WORKSPACE="../workspace"
DOCKER_COMPOSE="../docker-compose"

if ! [[ $(pwd) =~ .+scripts$ ]]; then
    cd scripts || exit 1
fi

if [[ $* == *--stop* ]]; then
    docker-compose -f ../docker-compose/docker-compose.yaml down
    exit 0
fi

if [[ $* == *--clean* ]]; then
    rm -rf $WORKSPACE/blockchain-tracker/Dockerfile/data
    rm -rf $WORKSPACE/backend/Dockerfile/data

    if [[ $* == *--clean-all* ]]; then
        rm -rf $WORKSPACE/backend/build
        rm -rf $WORKSPACE/backend/.gradle
        rm -rf $WORKSPACE/backend/.gradle.cache
        rm -rf $WORKSPACE/blockchain-tracker/.gocache

        if [[ $(docker volume ls | grep -c eticket_main_data) != 0 ]]; then
            docker volume rm eticket_main_data
        fi

        if [[ $(docker network ls | grep -c eticket_net) != 0 ]]; then
            docker network rm eticket_net
        fi
    fi

    exit 0
fi

if [[ $* != *--no-build* ]]; then
    cd $WORKSPACE/blockchain-tracker || exit 1
    if ! sh ./build.sh; then
        echo failed to build blockchain-tracker.
        exit 1
    fi

    cd ../backend || exit 1
    if ! sh ./build.sh; then
        echo failed to build backend.
        exit 1
    fi

    cd ../../scripts || exit 1
fi

if [[ $(docker volume ls | grep -c eticket_main_data) == 0 ]]; then
    if ! docker volume create eticket_main_data >/dev/null; then
        echo failed to create docker volume.
        echo please manually create docker volume "eticket_main_data" and retry.
        exit 1
    fi
fi

if [[ $(docker network ls | grep -c eticket_net) == 0 ]]; then
    if ! docker network create --driver bridge eticket_net >/dev/null; then
        echo failed to create docker network
        exit 1
    fi
fi

docker-compose -f $DOCKER_COMPOSE/docker-compose.yaml down
docker-compose -f $DOCKER_COMPOSE/docker-compose.yaml up -d --force-recreate --no-deps --build eticket_backend eticket_blockchain_tracker
docker-compose -f $DOCKER_COMPOSE/docker-compose.yaml up -d

if [[ $(docker images --filter "dangling=true" -q | wc -l) != 0 ]]; then
    docker image rm "$(docker images --filter "dangling=true" -q)"
fi
