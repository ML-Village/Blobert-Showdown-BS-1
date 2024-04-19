use starknet::ContractAddress;

#[derive(Model, Drop, Serde)]
struct Game {
    #[key]
    game_id: u128,
    player_a: ContractAddress,
    player_b: ContractAddress,
    active_blobert_a: u128,
    active_blobert_b: u128,
    turn: ContractAddress,
}
