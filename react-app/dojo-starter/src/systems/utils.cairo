use starknet::{ContractAddress};

#[inline(always)]
fn zero_address() -> ContractAddress {
    (starknet::contract_address_const::<0x0>())
}
