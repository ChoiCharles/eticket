#!/bin/sh

GOLANG_IMAGE=golang:1.21.1
GOBUILD_CACHE_DIR=.gocache/gobuild
GOMOD_CACHE_DIR=.gocache/gomod

if test -d ./Dockerfile/data; then
    rm -rf ./Dockerfile/data
fi

mkdir -p "$GOBUILD_CACHE_DIR"
mkdir -p "$GOMOD_CACHE_DIR"

docker run --rm -it \
    -v .:/workspace \
    -e "GOCACHE=/workspace/$GOBUILD_CACHE_DIR" \
    -e "GOMODCACHE=/workspace/$GOMOD_CACHE_DIR" \
    $GOLANG_IMAGE sh -c "cd /workspace && go build -o ./Dockerfile/data/app && chmod go+rw -R ./Dockerfile/data"

if ! test $? -eq 0; then
    exit 1
fi
