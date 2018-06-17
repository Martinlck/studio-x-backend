#!/bin/bash

usage() {
  echo ""
  echo "Usage : exec init | start |stop\n"
  echo "init  : builds the image of studio x backend"
  echo "start : start the stack"
  echo "stop : stop the stack"
}

start() {
  docker network create -d bridge --subnet=172.66.100.0/24 net
  docker run -d --name gds --network=net --hostname gds -p 8000:8000 google/cloud-sdk gcloud beta emulators datastore start --project=ah --host-port gds:8000 --no-store-on-disk
  docker run -p 8080:8080 -d --name studio-x --network=net -e NODE_PATH=. -e DATASTORE_DATASET=ah -e DATASTORE_EMULATOR_HOST=gds:8000 -e DATASTORE_EMULATOR_HOST_PATH=gds:8000/datastore -e DATASTORE_HOST=http://gds:8000 -e DATASTORE_PROJECT_ID=ah studio-x
  sleep 5
}

stop() {
  docker rm -f gds studio-x
  docker network rm net
}

init() {
  docker build -t studio-x .
}

if [ $# -eq 0 ]
  then
    usage
    exit 1
fi

case "$1" in
  "start")
  start
  ;;
  "stop")
  stop
  ;;
  "init")
  init
esac