#!/bin/bash

if [[ $* == *--stop* ]]; then
    docker-compose -f docker-compose/docker-compose.yaml down
    exit 0
fi

if [[ $* == *--clean* ]]; then
    rm -rf ./blockchain-tracker/Dockerfile/data
    rm -rf ./backend/Dockerfile/data

    if [[ $* == *--clean-all* ]]; then
        rm -rf ./backend/build
        rm -rf ./backend/.gradle
        rm -rf ./backend/.gradle.cache
        rm -rf ./blockchain-tracker/.gocache

        if [[ $(docker volume ls | grep -c eticket_main_data) != 0 ]]; then
            docker volume rm eticket_main_data
        fi
    fi

    exit 0
fi

if [[ $* != *--no-build* ]]; then
    cd ./blockchain-tracker || exit 1
    if ! sh ./build.sh; then
        echo failed to build blockchain-tracker.
        exit 1
    fi

    cd ../backend || exit 1
    if ! sh ./build.sh; then
        echo failed to build backend.
        exit 1
    fi

    cd ..
fi

if [[ $(docker volume ls | grep -c eticket_main_data) == 0 ]]; then
    if ! docker volume create eticket_main_data >/dev/null; then
        echo failed to create docker volume.
        echo please manually create docker volume "eticket_main_data" and retry.
        exit 1
    fi
fi

docker-compose -f docker-compose/docker-compose.yaml down
docker-compose -f docker-compose/docker-compose.yaml up -d --force-recreate --no-deps --build eticket_backend eticket_blockchain_tracker
docker-compose -f docker-compose/docker-compose.yaml up -d

if [[ $(docker images --filter "dangling=true" -q | wc -l) != 0 ]]; then
    docker image rm $(docker images --filter "dangling=true" -q)
fi
