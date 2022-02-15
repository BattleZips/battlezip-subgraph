import { Address, BigDecimal, BigInt } from '@graphprotocol/graph-ts';

export let ADDRESS_ZERO = Address.fromString('0x0000000000000000000000000000000000000000');

export let BIG_DECIMAL_ZERO = BigDecimal.fromString('0');

export let BIG_DECIMAL_ONE = BigDecimal.fromString('1');

export let BIG_DECIMAL_18 = BigDecimal.fromString('1e18');

export let BIG_INT_ZERO = BigInt.fromI32(0);

export let BIG_INT_ONE = BigInt.fromI32(1);

export let BIG_INT_18 = BigInt.fromI32(10).pow(18 as u8);
