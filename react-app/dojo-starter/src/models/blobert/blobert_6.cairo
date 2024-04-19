use starknet::ContractAddress;
use dojo_starter::models::side_effect::{SideEffectType};

//this will be the pokemon
#[derive(Model, Drop, Serde)]
struct BlobertSix {
    #[key]
    player_id: ContractAddress,
    #[key]
    game_id: u128,
    #[key]
    blobert_id: u128,
    health: u8,
    blobet_side_effect: SideEffectType
}