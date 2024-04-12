#[cfg(test)]
mod tests {
    use starknet::class_hash::Felt252TryIntoClassHash;

    // import world dispatcher
    use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};

    // import test utils
    use dojo::test_utils::{spawn_test_world, deploy_contract};

    // import test utils
    use dojo_starter::{
        systems::{lobby::{lobby, ILobbyDispatcher, ILobbyDispatcherTrait}},
        models::{blobert::{blobert_1::BlobertOne,blobert_2::BlobertTwo,blobert_3::BlobertThree,blobert_4::BlobertFour,blobert_5::BlobertFive,blobert_6::BlobertSix}, player::{Player}}
    };


    #[test]
    #[available_gas(30000000)]
    fn test_register() {
        // caller
        let caller = starknet::contract_address_const::<0x0>();

        // models
        let mut models = array![blobert::TEST_CLASS_HASH, player::TEST_CLASS_HASH];

        // deploy world with models
        let world = spawn_test_world(models);

        // deploy systems contract
        let contract_address = world
            .deploy_contract('salt', lobby::TEST_CLASS_HASH.try_into().unwrap());
        let lobby_systems = ILobbyDispatcher { contract_address };

        // call spawn()
        lobby_systems.register_player('test');

        // Check world state
        let player = get!(world, caller, Player);

        // check player
        assert(player.name == 'test', 'name is wrong');
    }
}
