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
        models::{player::{Player, player}, blobert_lineup::{BlobertLineup, blobert_lineup}}
    };


    #[test]
    #[available_gas(30000000)]
    fn test_register() {
        // caller
        let caller = starknet::contract_address_const::<0x0>();

        // models
        let mut models = array![player::TEST_CLASS_HASH];

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

    #[test]
    #[available_gas(30000000)]
    fn test_choose_blobert() {
        // caller
        let caller = starknet::contract_address_const::<0x0>();

        // models
        let mut models = array![player::TEST_CLASS_HASH, blobert_lineup::TEST_CLASS_HASH];

        // deploy world with models
        let world = spawn_test_world(models);

        // deploy systems contract
        let contract_address = world
            .deploy_contract('salt', lobby::TEST_CLASS_HASH.try_into().unwrap());
        let lobby_systems = ILobbyDispatcher { contract_address };

        // Call register()
        lobby_systems.register_player('test');

        // Check world state
        let player = get!(world, caller, Player);
    
        // Call Choose Blobert
        lobby_systems.choose_blobert(1,2,3,4,5,6);

        // Check world state
        let mut blobert_lineup = get!(world, caller, BlobertLineup);

        assert(blobert_lineup.blobert_1 == 1, 'id is wrong');
        assert(blobert_lineup.blobert_2 == 2, 'id is wrong');
        assert(blobert_lineup.blobert_3 == 3, 'id is wrong');
        assert(blobert_lineup.blobert_4 == 4, 'id is wrong');
        assert(blobert_lineup.blobert_5 == 5, 'id is wrong');
        assert(blobert_lineup.blobert_6 == 6, 'id is wrong');
    }
}
