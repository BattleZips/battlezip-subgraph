import { BattleshipGame } from '../../generated/schema';
import { BigInt, log } from '@graphprotocol/graph-ts';

export function ensureBattleShipGame(id: string): BattleshipGame {
  let game = BattleshipGame.load(id);
  if (game) {
    return game;
  }

  game = new BattleshipGame(id);
  game.status = 'STARTED';
  game.totalShots = BigInt.fromI32(0);

  return game;
}
