use dojo_starter::models::move_book::MoveType;
use dojo_starter::models::blobert_pokedex::BlobertPokedex;

#[starknet::interface]
trait IRegistry<TContractState> {
    fn register_moves(
        self: @TContractState, move_id: u128, move_name: felt252, damage: u8, move_type: MoveType
    );
    fn register_blobert(
        self: @TContractState,
        blobert_id: u128,
        blobert_name: felt252,
        health: u8,
        attack: u8,
        special_attack: u8,
        special_defense: u8,
        speed: u8
    );
}

#[dojo::contract]
mod registry {
    use super::{IRegistry};

    use dojo_starter::models::move_book::MoveBook;
    use dojo_starter::models::move_book::MoveType;
    use dojo_starter::models::blobert_pokedex::BlobertPokedex;

    #[abi(embed_v0)]
    impl RegistryImpl of IRegistry<ContractState> {
        fn register_moves(
            self: @ContractState, move_id: u128, move_name: felt252, damage: u8, move_type: MoveType
        ) {
            let move_book = MoveBook { move_id, move_name, damage, move_type };

            set!(self.world(), (move_book));
            return ();
        }

        fn register_blobert(
            self: @ContractState,
            blobert_id: u128,
            blobert_name: felt252,
            health: u8,
            attack: u8,
            special_attack: u8,
            special_defense: u8,
            speed: u8
        ) {
            let blobert = BlobertPokedex {
                blobert_id, blobert_name, health, attack, special_attack, special_defense, speed
            };

            set!(self.world(), (blobert));
            return ();
        }
    }
}
