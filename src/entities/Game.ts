import { BattleshipGame } from '../../generated/schema';
import { BIG_INT_ZERO } from '../constants';
import { BigInt, log } from '@graphprotocol/graph-ts';

export function ensureBattleShipGame(id: string): BattleshipGame {
  let game = BattleshipGame.load(id);
  if (game) {
    return game;
  }

  game = new BattleshipGame(id);
  game.shots = [''];
  game.status = 'STARTED';
  game.totalShots = BigInt.fromI32(0);

  return game;
}
