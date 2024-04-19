use starknet::{ContractAddress};
use dojo_starter::models::player::Player;
use dojo_starter::models::blobert_lineup::BlobertLineup;

#[starknet::interface]
trait ILobby<TContractState> {
    fn register_player(self: @TContractState, name: felt252);
    fn choose_blobert(
        self: @TContractState,
        blobert_1: u128,
        blobert_2: u128,
        blobert_3: u128,
        blobert_4: u128,
        blobert_5: u128,
        blobert_6: u128
    );
    fn create_battle_room(self: @TContractState);
// fn find_battle(
//     self: @TContractState,
//     challenged: ContractAddress,
//     message: felt252,
//     expire_seconds: u64
// ) -> u128;
}

#[dojo::contract]
mod lobby {
    use super::{ILobby};

    use starknet::{ContractAddress, get_caller_address, get_block_timestamp};
    use dojo_starter::models::{player::Player};
    use dojo_starter::models::{blobert_lineup::BlobertLineup};
    use dojo_starter::models::{game::Game};
    use dojo_starter::models::{blobert_pokedex::BlobertPokedex};
    use dojo_starter::utils::seed_gen::{make_seed};
    use dojo_starter::systems::utils;

    #[abi(embed_v0)]
    impl LobbyImpl of ILobby<ContractState> {
        fn register_player(self: @ContractState, name: felt252) {
            let caller: ContractAddress = starknet::get_caller_address();

            let (mut player, mut blobert_lineup) = get!(
                self.world(), caller, (Player, BlobertLineup)
            );

            if (player.timestamp == 0) {
                player.timestamp = get_block_timestamp();
            }

            blobert_lineup.address = caller;
            blobert_lineup.blobert_1 = 0;
            blobert_lineup.blobert_2 = 0;
            blobert_lineup.blobert_3 = 0;
            blobert_lineup.blobert_4 = 0;
            blobert_lineup.blobert_5 = 0;
            blobert_lineup.blobert_6 = 0;

            player.address = caller;
            player.name = name;
            player.total_duels = 0;
            player.total_wins = 0;
            player.total_losses = 0;
            player.timestamp = get_block_timestamp();

            set!(self.world(), (player, blobert_lineup));
            return ();
        }

        fn choose_blobert(
            self: @ContractState,
            blobert_1: u128,
            blobert_2: u128,
            blobert_3: u128,
            blobert_4: u128,
            blobert_5: u128,
            blobert_6: u128
        ) {
            //Get the caller of the player
            let caller: ContractAddress = starknet::get_caller_address();

            //get the blobert lineup
            let mut blobert_lineup: BlobertLineup = get!(self.world(), caller, (BlobertLineup));

            //Get all the blobert line up 1-6 if they exist
            let mut first_blobert: BlobertPokedex = get!(self.world(), blobert_1, (BlobertPokedex));
            let mut second_blobert: BlobertPokedex = get!(
                self.world(), blobert_2, (BlobertPokedex)
            );
            let mut third_blobert: BlobertPokedex = get!(self.world(), blobert_3, (BlobertPokedex));
            let mut fourth_blobert: BlobertPokedex = get!(
                self.world(), blobert_4, (BlobertPokedex)
            );
            let mut fifth_blobert: BlobertPokedex = get!(self.world(), blobert_5, (BlobertPokedex));
            let mut sixth_blobert: BlobertPokedex = get!(self.world(), blobert_6, (BlobertPokedex));

            //Do a check if its empty then its doesnt exist
            assert(first_blobert.blobert_name != '', 'Blobert not found');
            assert(second_blobert.blobert_name != '', 'Blobert not found');
            assert(third_blobert.blobert_name != '', 'Blobert not found');
            assert(fourth_blobert.blobert_name != '', 'Blobert not found');
            assert(fifth_blobert.blobert_name != '', 'Blobert not found');
            assert(sixth_blobert.blobert_name != '', 'Blobert not found');

            //set the blobert lineup
            blobert_lineup.blobert_1 = blobert_1;
            blobert_lineup.blobert_2 = blobert_2;
            blobert_lineup.blobert_3 = blobert_3;
            blobert_lineup.blobert_4 = blobert_4;
            blobert_lineup.blobert_5 = blobert_5;
            blobert_lineup.blobert_6 = blobert_6;

            //set the state change
            set!(self.world(), (blobert_lineup));
            return ();
        }

        fn create_battle_room(self: @ContractState) {
            //Create the battle room 

            //Get the caller of the one init
            let caller: ContractAddress = starknet::get_caller_address();

            //Check if the lineup is filled , if not revert
            let mut blobert_lineup: BlobertLineup = get!(self.world(), caller, (BlobertLineup));
            assert(blobert_lineup.blobert_1 != 0, 'Lineup is not ready');
            assert(blobert_lineup.blobert_2 != 0, 'Lineup is not ready');
            assert(blobert_lineup.blobert_3 != 0, 'Lineup is not ready');
            assert(blobert_lineup.blobert_4 != 0, 'Lineup is not ready');
            assert(blobert_lineup.blobert_5 != 0, 'Lineup is not ready');
            assert(blobert_lineup.blobert_6 != 0, 'Lineup is not ready');

            //If all good then just create the new game
            let game = Game {
                game_id: make_seed(caller),
                player_a: caller,
                player_b: utils::zero_address(),
                active_blobert_a: blobert_lineup.blobert_1,
                active_blobert_b: 0,
                turn: caller
            };

            //set the state change
            set!(self.world(), (game, blobert_lineup));
            return ();
        }
    }
}

#[cfg(test)]
mod tests {}
