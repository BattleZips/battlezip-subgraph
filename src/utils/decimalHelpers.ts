import { BigDecimal, BigInt } from '@graphprotocol/graph-ts';
import { BIG_DECIMAL_18 } from '../constants';

export function toBigDecimal(quantity: BigInt, decimals: i32 = 18): BigDecimal {
  return quantity.divDecimal(
    BigInt.fromI32(10)
      .pow(decimals as u8)
      .toBigDecimal(),
  );
}

export const bigDecimalToBigInt = (decimal: BigDecimal): BigInt => {
  return BigInt.fromString(decimal.truncate(18).times(BIG_DECIMAL_18).toString());
};
