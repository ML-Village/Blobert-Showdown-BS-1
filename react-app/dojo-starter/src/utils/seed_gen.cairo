// use debug::PrintTrait;
use starknet::{ContractAddress};
use dojo_starter::utils::hash::{hash_u128, hash_u128_to_u256, felt_to_u128};

// https://github.com/starkware-libs/cairo/blob/main/corelib/src/starknet/info.cairo
use starknet::get_block_info;

fn make_seed(caller: ContractAddress) -> u128 {
    hash_u128(felt_to_u128(caller.into()), _make_block_hash())
}

fn _make_block_hash() -> u128 {
    // let block_number = get_block_number();
    // let block_timestamp = get_block_timestamp();
    let block_info = get_block_info().unbox();
    hash_u128(block_info.block_number.into(), block_info.block_timestamp.into())
}