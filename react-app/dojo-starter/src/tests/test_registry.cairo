#[cfg(test)]
mod tests {
    use starknet::class_hash::Felt252TryIntoClassHash;

    // import world dispatcher
    use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};

    // import test utils
    use dojo::test_utils::{spawn_test_world, deploy_contract};

    // import test utils
    use dojo_starter::{
        systems::{registry::{registry, IRegistryDispatcher, IRegistryDispatcherTrait}},
        models::{move_book::{move_book, MoveBook, MoveType}}
    };


    #[test]
    #[available_gas(30000000)]
    fn test_register_move() {
        // caller
        let caller = starknet::contract_address_const::<0x0>();

        // models
        let mut models = array![move_book::TEST_CLASS_HASH];

        // deploy world with models
        let world = spawn_test_world(models);

        // deploy systems contract
        let contract_address = world
            .deploy_contract('salt', registry::TEST_CLASS_HASH.try_into().unwrap());
        let registry_systems = IRegistryDispatcher { contract_address };

        // call register_moves
        registry_systems.register_moves(1, 'Special Punch', 90, MoveType::Physical);

        // Check world state
        let move = get!(world, 1, (MoveBook));

        // check move
        assert(move.move_id == 1, 'id is wrong');
    }
}
