import { BattleshipGame } from '../../generated/schema';
import { BIG_INT_ZERO } from '../constants';

export function ensureBattleShipGame(id: string): BattleshipGame {
  let game = BattleshipGame.load(id) as BattleshipGame;
  if (game) {
    return game;
  }

  game = new BattleshipGame(id);
  game.status = 'STARTED';
  game.totalShots = BIG_INT_ZERO;
  game.save();

  return game;
}
