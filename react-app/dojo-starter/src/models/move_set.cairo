#[derive(Model, Copy, Drop, Serde)]
struct MoveSet {
    #[key]
    blobert_id: u128,
    move_1: u128,
    move_2: u128,
    move_3: u128,
    move_4: u128
}