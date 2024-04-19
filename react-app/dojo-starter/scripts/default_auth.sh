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
sozo auth grant --world $WORLD_ADDRESS --wait writer \
  Player,$LOBBY_ADDRESS \
  BlobertLineup,$LOBBY_ADDRESS \
  Game,$LOBBY_ADDRESS \
  BlobertPokedex,$LOBBY_ADDRESS \
  >/dev/null

# enable system -> models authorizations
# sozo auth grant --world $WORLD_ADDRESS --wait writer \
#   Position,dojo_starter::systems::actions::actions\
#   Moves,dojo_starter::systems::actions::actions\
#   >/dev/null

echo "Default authorizations have been successfully set."
