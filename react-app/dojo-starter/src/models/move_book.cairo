#[derive(Model, Copy, Drop, Serde)]
struct MoveBook {
    #[key]
    move_id: u128,
    move_name: felt252,
    damage: u8,
    move_type: MoveType
}

#[derive(Copy, Drop, Serde, PartialEq, Introspect)]
enum MoveType {
   Physical,
   Special
}
