#[cfg(test)]
mod utils {
    use starknet::{ContractAddress, testing};
    use starknet::class_hash::Felt252TryIntoClassHash;
    use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};

    // import test utils
    use dojo::test_utils::{spawn_test_world, deploy_contract};

    use dojo_starter::{
        systems::{
            lobby::{lobby, ILobbyDispatcher, ILobbyDispatcherTrait},
            registry::{registry, IRegistryDispatcher, IRegistryDispatcherTrait}
        },
        models::{
            player::{Player, player}, blobert_lineup::{BlobertLineup, blobert_lineup},
            game::{Game, game}, blobert_pokedex::{BlobertPokedex, blobert_pokedex}
        }
    };

    const INITIAL_TIMESTAMP: u64 = 0x100000000;
    const INITIAL_STEP: u64 = 0x10;

    fn setup_world(
        initialize: bool, approve: bool
    ) -> (IWorldDispatcher, ILobbyDispatcher, IRegistryDispatcher, ContractAddress) {
        let mut models = array![
            player::TEST_CLASS_HASH,
            blobert_lineup::TEST_CLASS_HASH,
            blobert_pokedex::TEST_CLASS_HASH
        ];
        let world: IWorldDispatcher = spawn_test_world(models);
        let lobby = ILobbyDispatcher {
            contract_address: world
                .deploy_contract('salt', lobby::TEST_CLASS_HASH.try_into().unwrap())
        };
        let registry = IRegistryDispatcher {
            contract_address: world
                .deploy_contract('salt1', registry::TEST_CLASS_HASH.try_into().unwrap())
        };

        let owner: ContractAddress = starknet::contract_address_const::<0x111111>();

        testing::set_contract_address(owner); // this is the CALLER!!
        testing::set_block_number(1);
        testing::set_block_timestamp(INITIAL_TIMESTAMP);

        (world, lobby, registry, owner)
    }

    fn elapse_timestamp(delta: u64) -> (u64, u64) {
        let block_info = starknet::get_block_info().unbox();
        let new_block_number = block_info.block_number + 1;
        let new_block_timestamp = block_info.block_timestamp + delta;
        testing::set_block_number(new_block_number);
        testing::set_block_timestamp(new_block_timestamp);
        (new_block_number, new_block_timestamp)
    }

    #[inline(always)]
    fn _next_block() -> (u64, u64) {
        elapse_timestamp(INITIAL_STEP)
    }

    fn execute_register_player(system: ILobbyDispatcher, sender: ContractAddress, name: felt252) {
        testing::set_contract_address(sender);
        system.register_player(name);
        _next_block();
    }
}
