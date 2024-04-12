use starknet::ContractAddress;
// use dojo_starter::models::{types::BlobertTypes, side_effect::SideEffectType};
// use dojo_starter::types::blobert::{GOATbert,STARKbert,_1337bert,ambert,blobertt,blobhetti,bobbyrealms,breadbert};


//this will be the pokemon
#[derive(Model, Drop, Serde)]
struct BlobertThree {
    #[key]
    player_id: ContractAddress,
    #[key]
    blobert_id: u8,
    health: u8,
    // blobert_type: BlobertTypes,
    // blobert_side_effect: SideEffectType,
}