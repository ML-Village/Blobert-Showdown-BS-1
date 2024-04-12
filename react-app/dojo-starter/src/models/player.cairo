use starknet::ContractAddress;
use dojo_starter::models::blobert::{blobert_1::BlobertOne,blobert_2::BlobertTwo,blobert_3::BlobertThree,blobert_4::BlobertFour,blobert_5::BlobertFive,blobert_6::BlobertSix};


#[derive(Model, Drop, Serde)]
struct Player {
    #[key]
    address: ContractAddress,
    blobert_1: BlobertOne,
    blobert_2: BlobertTwo,
    blobert_3: BlobertThree,
    blobert_4: BlobertFour,
    blobert_5: BlobertFive,
    blobert_6: BlobertSix,
    name: felt252,
    total_duels: u16,
    total_wins: u16,
    total_losses: u16,
    timestamp: u64, // Unix time, 1st registered
}