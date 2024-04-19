#!/bin/bash
set -euo pipefail
pushd $(dirname "$0")/..

export RPC_URL="http://localhost:5050";

export WORLD_ADDRESS=$(cat ./manifests/dev/manifest.json | jq -r '.world.address')

# export LOBBY_ADDRESS=$(cat ./manifests/dev/manifest.json | jq -r '.contracts[] | select(.name == "dojo_starter::systems::lobby::lobby" ).address')

# sozo execute --world <WORLD_ADDRESS> <CONTRACT> <ENTRYPOINT>
sozo execute --world $WORLD_ADDRESS dojo_starter::systems::registry::registry register_blobert -c 1,0x74657374,100,100,100,100,100 --wait
sozo execute --world $WORLD_ADDRESS dojo_starter::systems::registry::registry register_blobert -c 2,0x74657374,100,100,100,100,100 --wait
sozo execute --world $WORLD_ADDRESS dojo_starter::systems::registry::registry register_blobert -c 3,0x74657374,100,100,100,100,100 --wait
sozo execute --world $WORLD_ADDRESS dojo_starter::systems::registry::registry register_blobert -c 4,0x74657374,100,100,100,100,100 --wait
sozo execute --world $WORLD_ADDRESS dojo_starter::systems::registry::registry register_blobert -c 5,0x74657374,100,100,100,100,100 --wait
sozo execute --world $WORLD_ADDRESS dojo_starter::systems::registry::registry register_blobert -c 6,0x74657374,100,100,100,100,100 --wait

