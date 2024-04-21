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
sozo execute --world $WORLD_ADDRESS dojo_starter::systems::registry::registry register_blobert -c 7,0x74657374,100,100,100,100,100 --wait
sozo execute --world $WORLD_ADDRESS dojo_starter::systems::registry::registry register_blobert -c 8,0x74657374,100,100,100,100,100 --wait
sozo execute --world $WORLD_ADDRESS dojo_starter::systems::registry::registry register_blobert -c 9,0x74657374,100,100,100,100,100 --wait
sozo execute --world $WORLD_ADDRESS dojo_starter::systems::registry::registry register_blobert -c 10,0x74657374,100,100,100,100,100 --wait
sozo execute --world $WORLD_ADDRESS dojo_starter::systems::registry::registry register_blobert -c 11,0x74657374,100,100,100,100,100 --wait
sozo execute --world $WORLD_ADDRESS dojo_starter::systems::registry::registry register_blobert -c 12,0x74657374,100,100,100,100,100 --wait
sozo execute --world $WORLD_ADDRESS dojo_starter::systems::registry::registry register_blobert -c 13,0x74657374,100,100,100,100,100 --wait
sozo execute --world $WORLD_ADDRESS dojo_starter::systems::registry::registry register_blobert -c 14,0x74657374,100,100,100,100,100 --wait
sozo execute --world $WORLD_ADDRESS dojo_starter::systems::registry::registry register_blobert -c 15,0x74657374,100,100,100,100,100 --wait
sozo execute --world $WORLD_ADDRESS dojo_starter::systems::registry::registry register_blobert -c 16,0x74657374,100,100,100,100,100 --wait
sozo execute --world $WORLD_ADDRESS dojo_starter::systems::registry::registry register_blobert -c 17,0x74657374,100,100,100,100,100 --wait
sozo execute --world $WORLD_ADDRESS dojo_starter::systems::registry::registry register_blobert -c 18,0x74657374,100,100,100,100,100 --wait
sozo execute --world $WORLD_ADDRESS dojo_starter::systems::registry::registry register_blobert -c 19,0x74657374,100,100,100,100,100 --wait
sozo execute --world $WORLD_ADDRESS dojo_starter::systems::registry::registry register_blobert -c 20,0x74657374,100,100,100,100,100 --wait
sozo execute --world $WORLD_ADDRESS dojo_starter::systems::registry::registry register_blobert -c 21,0x74657374,100,100,100,100,100 --wait
sozo execute --world $WORLD_ADDRESS dojo_starter::systems::registry::registry register_blobert -c 22,0x74657374,100,100,100,100,100 --wait
sozo execute --world $WORLD_ADDRESS dojo_starter::systems::registry::registry register_blobert -c 23,0x74657374,100,100,100,100,100 --wait
sozo execute --world $WORLD_ADDRESS dojo_starter::systems::registry::registry register_blobert -c 24,0x74657374,100,100,100,100,100 --wait
sozo execute --world $WORLD_ADDRESS dojo_starter::systems::registry::registry register_blobert -c 25,0x74657374,100,100,100,100,100 --wait


