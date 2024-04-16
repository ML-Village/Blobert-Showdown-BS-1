use starknet::ContractAddress;
use dojo_starter::models::blobert::{blobert_1::BlobertOne,blobert_2::BlobertTwo,blobert_3::BlobertThree,blobert_4::BlobertFour,blobert_5::BlobertFive,blobert_6::BlobertSix};

//TODO 
// Do a check if there is same blobert 


#[derive(Model, Drop, Serde)]
struct BlobertLineup {
    #[key]
    address: ContractAddress,
    blobert_1: u8,
    blobert_2: u8,
    blobert_3: u8,
    blobert_4: u8,
    blobert_5: u8,
    blobert_6: u8,
}

