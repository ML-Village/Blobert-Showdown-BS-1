#!/bin/bash
set -euo pipefail
pushd $(dirname "$0")/..

export RPC_URL="http://localhost:5050"

export WORLD_ADDRESS=$(cat ./manifests/dev/manifest.json | jq -r '.world.address')

export LOBBY_ADDRESS=$(cat ./manifests/dev/manifest.json | jq -r '.contracts[] | select(.name == "dojo_starter::systems::lobby::lobby" ).address')

echo "---------------------------------------------------------------------------"
echo world : $WORLD_ADDRESS
echo " "
echo lobby : $LOBBY_ADDRESS
echo "---------------------------------------------------------------------------"

# enable system -> models authorizations
sozo auth grant --world $LOBBY_ADDRESS --wait writer \
  Player,dojo_starter::systems::lobby:lobby \
  BlobertOne,dojo_starter::systems::lobby:lobby \
  BlobertTwo,dojo_starter::systems::lobby:lobby \
  BlobertThree,dojo_starter::systems::lobby:lobby \
  BlobertFour,dojo_starter::systems::lobby:lobby \
  BlobertFive,dojo_starter::systems::lobby:lobby \
  BlobertSix,dojo_starter::systems::lobby:lobby \
  >/dev/null

# enable system -> models authorizations
sozo auth grant --world $WORLD_ADDRESS --wait writer \
  Position,dojo_starter::systems::actions::actions\
  Moves,dojo_starter::systems::actions::actions\
  >/dev/null

echo "Default authorizations have been successfully set."
