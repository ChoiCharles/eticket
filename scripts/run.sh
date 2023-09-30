#!/bin/bash

if [[ $(pwd) =~ /scripts$ ]]; then
    cd ..
fi

PROJECT_DIR="$(pwd)"
WORKSPACE_DIR="$PROJECT_DIR/workspace"
DOCKER_COMPOSE_DIR="$PROJECT_DIR/docker-compose"

if [[ $* == *--stop* ]]; then
    docker-compose -f "$DOCKER_COMPOSE_DIR/docker-compose.yaml" down
    exit 0
fi

if [[ $* != *--no-build* ]]; then
    BUILD_TARGETS="blockchain-tracker backend-waiting"
    if [[ $* != *--without-backend* ]]; then
        BUILD_TARGETS="$BUILD_TARGETS backend"
    fi

    OIFS=$IFS
    IFS=" "
    for SERVICE in $BUILD_TARGETS; do
        SERVICE_PROJECT_DIR="$WORKSPACE_DIR/$SERVICE"

        if ! test -d "$SERVICE_PROJECT_DIR"; then
            echo "Couldn't find project directory for service \"$SERVICE\""
            exit 1
        fi

        if ! test -f "$SERVICE_PROJECT_DIR/build.sh"; then
            echo "Colunt't find project build script of service \"$SERVICE\"."
            exit 1
        fi

        if ! sh -c "cd $(realpath "$SERVICE_PROJECT_DIR") && $SERVICE_PROJECT_DIR/build.sh"; then
            echo "Failed to build service \"$SERVICE\"."
            exit 1
        fi
    done

    IFS=$OIFS
    cd "$PROJECT_DIR" || exit 1
fi

if [[ "$(docker network ls --format "{{.Name}}" | grep -c --regex "^eticket_net$")" == 0 ]]; then
    if ! docker network create eticket_net --driver bridge 1>/dev/null; then
        echo "Failed to create docker network \"eticket_net\"."
        exit 1
    fi

    echo "A docker network \"eticket_net\" created."
fi

if [[ "$(docker volume ls --format "{{.Name}}" | grep -c --regex "^eticket_main_data$")" == 0 ]]; then
    if ! docker volume create eticket_main_data 1>/dev/null; then
        echo "Failed create docker volume \"eticket_main_data\"."
        exit 1
    fi
fi

TARGET_DOCKER_COMPOSE="$DOCKER_COMPOSE_DIR/docker-compose.yaml"
if [[ $* == *--no-backend* ]]; then
    TARGET_DOCKER_COMPOSE="$DOCKER_COMPOSE_DIR/docker-compose-no-backend.yaml"
fi

REBUILD_TARGETS="eticket_blockchain_tracker eticket_backend_waiting"
if [[ $* != *--no-backend* ]]; then
    REBUILD_TARGETS="$REBUILD_TARGETS eticket_backend"
fi

docker-compose -f "$TARGET_DOCKER_COMPOSE" down

OIFS=$IFS
IFS=" "
for SERVICE in $REBUILD_TARGETS; do
    if ! docker-compose -f "$TARGET_DOCKER_COMPOSE" up -d --force-recreate --no-deps --build "$SERVICE"; then
        echo "Failed to start service \"$SERVICE\"."
        exit 1
    fi
done
IFS=$OIFS

docker-compose -f "$TARGET_DOCKER_COMPOSE" up -d

if [[ $(docker images --filter "dangling=true" -q | wc -l) != 0 ]]; then
    # shellcheck disable=SC2046
    docker image rm $(docker images --filter "dangling=true" -q)
fi
