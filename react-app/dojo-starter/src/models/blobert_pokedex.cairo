use dojo_starter::models::move_set::MoveSet;
use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};

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
// fn check_blobert_by_id(blobert_id: u128) -> bool {
//     let blobert: BlobertPokedex = get!(self.world, blobert_id, (BlobertPokedex));
//     (blobert.blobert_id != 0)
// }


