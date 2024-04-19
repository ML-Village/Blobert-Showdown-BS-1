#[derive(Copy, Drop, Serde, PartialEq, Introspect)]
enum SideEffectType {
   Burn,
    Paralyzed,
    Frozen,
    Sleep,
    Poison,
    Confusion,
    Flinch
}