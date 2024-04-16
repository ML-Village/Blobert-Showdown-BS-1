use dojo_starter::models::move_set::MoveSet;

#[derive(Model, Copy, Drop, Serde)]
struct BlobertPokedex {
    #[key]
    blobert_id: u128,
    blobert_name: felt252,
    health: u8, 
    attack: u8,
    special_attack: u8,
    special_defense: u8,
    speed: u8,
}