#!/bin/bash

GRADLE_IMAGE=gradle:8.3.0-jdk17-jammy

function build-jar() {
    docker run --rm -t -v .:/workspace $GRADLE_IMAGE sh -c  "cd /workspace && gradle build --build-cache -g .gradle.cache -x test"
    if [[ $? != 0 ]]; then
        echo failed to build java project.
        exit -1
    fi

    # remove a previous build result
    rm -f Dockerfile/data/app.jar

    mkdir -p Dockerfile/data
    find build/ -iregex ".+-SNAPSHOT[.]jar$" | xargs -I{} cp {} Dockerfile/data/app.jar

    # check whether .jar was successfully copied
    if ! test -f ./Dockerfile/data/app.jar; then
        echo failed to find build result. something had be gone wrong. sorry.
        exit -1
    fi

    echo successfully built.
}

if [[ $* != *--no-build* ]]; then
    build-jar
fi

if [[ $(docker volume ls | grep eticket_main_data | wc -l) == 0 ]]; then
    docker volume create eticket_main_data > /dev/null
    if [[ $? != 0 ]]; then
        echo failed to create docker volume.
        echo please manually create docker volume "eticket_main_data" and retry.
        exit -1
    fi
fi

docker-compose down
docker-compose up -d --force-recreate --no-deps --build eticket_backend
docker-compose up -d

if [[ $(docker images --filter "dangling=true" -q | wc -l) != 0 ]]; then
    docker image rm $(docker images --filter "dangling=true" -q)
fi