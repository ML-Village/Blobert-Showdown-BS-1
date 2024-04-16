use starknet::{ContractAddress};
use dojo_starter::models::player::Player;
use dojo_starter::models::blobert_lineup::BlobertLineup;

#[dojo::interface]
trait ILobby<TContractState> {
    fn register_player(self: @TContractState, name: felt252);
    fn choose_blobert(self: @TContractState,blobert_1: u8, blobert_2: u8, blobert_3:u8, blobert_4:u8, blobert_5: u8, blobert_6:u8);
    // fn find_battle(
    //     self: @TContractState,
    //     challenged: ContractAddress,
    //     message: felt252,
    //     wager_coin: u8,
    //     wager_value: u256,
    //     expire_seconds: u64
    // ) -> u128;
}

#[dojo::contract]
mod lobby {
    use super::{ILobby};

    use starknet::{ContractAddress, get_caller_address, get_block_timestamp};
    use dojo_starter::models::{player::Player};
    use dojo_starter::models::blobert_lineup::BlobertLineup;
    // use dojo_starter::types::game::{GameState};
    // use dojo_starter::utils::timestamp::{timestamp};
    // use dojo_starter::systems::game_id_generate::{make_seed};
    // use dojo_starter::systems::utils::{zero_address};
    // use dojo_starter::models::blobert::{blobert_1::BlobertOne,blobert_2::BlobertTwo,blobert_3::BlobertThree,blobert_4::BlobertFour,blobert_5::BlobertFive,blobert_6::BlobertSix};

    #[abi(embed_v0)]
    impl LobbyImpl of ILobby<ContractState> {
        fn register_player(self: @ContractState, name: felt252) {
            let caller: ContractAddress = starknet::get_caller_address();

            let (mut player, mut blobert_lineup) = get!(self.world(), caller, (Player, BlobertLineup));

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

        fn choose_blobert(self: @ContractState, blobert_1: u8, blobert_2: u8, blobert_3:u8, blobert_4:u8, blobert_5: u8, blobert_6:u8){
            let caller: ContractAddress = starknet::get_caller_address();
            let mut blobert_lineup: BlobertLineup = get!(self.world(), caller, (BlobertLineup));
            blobert_lineup.blobert_1 = blobert_1;
            blobert_lineup.blobert_2 = blobert_2;
            blobert_lineup.blobert_3 = blobert_3;
            blobert_lineup.blobert_4 = blobert_4;
            blobert_lineup.blobert_5 = blobert_5;
            blobert_lineup.blobert_6 = blobert_6;
            set!(self.world(), (blobert_lineup));
            return ();
        }

        // fn find_battle(
        //     self: @ContractState,
        //     challenged: ContractAddress,
        //     message: felt252,
        //     wager_coin: u8,
        //     wager_value: u256,
        //     expire_seconds: u64
        // ) -> u128 {
        //     //check if the challenger address is empty
        //     assert(challenged != zero_address(), 'Missing challenged address');
        //     assert(
        //         expire_seconds == 0 || expire_seconds >= timestamp::from_hours(1),
        //         'Invalid expire_seconds'
        //     );

        //     let caller: ContractAddress = starknet::get_caller_address();

        //     let player: Player = get!(self.world(), caller, Player);
        //     assert(player.name != 0, 'Challenger not registered');
        //     assert(caller != challenged, 'Challenging thyself, you fool!');

        //     //create the battle
        //     let game_id: u128 = make_seed(caller);

        //     // calc expiration
        //     let timestamp_start: u64 = get_block_timestamp();
        //     let timestamp_end: u64 = if (expire_seconds == 0) {
        //         0
        //     } else {
        //         timestamp_start + expire_seconds
        //     };

        //     let challenge = Game {
        //         game_id,
        //         player_a: caller,
        //         player_b: challenged,
        //         message,
        //         // progress
        //         state: GameState::Awaiting.into(),
        //         round_number: 0,
        //         winner: 0,
        //         // times
        //         timestamp_start, // challenge issued
        //         timestamp_end, // expire
        //     };

        //     (game_id)
        // }
    }
}

#[cfg(test)]
mod tests {

}