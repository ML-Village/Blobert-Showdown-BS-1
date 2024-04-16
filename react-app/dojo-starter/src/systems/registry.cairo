use dojo_starter::models::move_book::MoveType;

#[dojo::interface]
trait IRegistry<TContractState> {
    fn register_moves(self: @TContractState, move_id: u128, move_name: felt252, damage: u8, move_type: MoveType);
    // fn register_blobert();
}

#[dojo::contract]
mod registry {
    use super::{IRegistry};

    use dojo_starter::models::move_book::MoveBook;
    use dojo_starter::models::move_book::MoveType;

    #[abi(embed_v0)]
    impl RegistryImpl of IRegistry<ContractState> {
        fn register_moves(self: @ContractState,  move_id: u128, move_name: felt252, damage: u8, move_type: MoveType) {
            let move_book = MoveBook {
                move_id,
                move_name,
                damage,
                move_type
            };

            set!(self.world(), (move_book));
            return();
        }
    }
}