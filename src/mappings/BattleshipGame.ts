import { Joined, Started, Shot, Won, Report } from '../../generated/BattleshipGame/BattleshipGame';
import { BigInt, log } from '@graphprotocol/graph-ts';
import { BIG_INT_ONE } from '../constants';
import { ensureBattleShipGame } from '../entities/Game';
import { ensureShot } from '../entities/Shot';

export function handleGameStarted(event: Started): void {
  log.warning('Game started ID {}: ', [event.params._nonce.toString()]);
  let game = ensureBattleShipGame(event.params._nonce.toString());
  game.startedBy = event.params._by;
  game.save();
}

export function handleGameJoined(event: Joined): void {
  log.warning('Game joined ID {}: ', [event.params._nonce.toString()]);
  let game = ensureBattleShipGame(event.params._nonce.toString());
  game.joinedBy = event.params._by;
  game.status = 'JOINED';
  game.save();
}

export function handleReport(event: Report): void {
  log.warning('Game reported handled ID {}: ', [event.params._game.toString()]);
  let game = ensureBattleShipGame(event.params._game.toString());
  let shot = ensureShot(game.id.toString().concat('-').concat(game.totalShots.toString()));
  shot.hit = event.params.hit;
  shot.save();
}

export function handleShot(event: Shot): void {
  let gameId = event.params._game.toString();
  let game = ensureBattleShipGame(gameId);
  let totalShots = (game.totalShots = game.totalShots.plus(BIG_INT_ONE));
  log.warning('Shot ID {}: ', [event.params._game.toString().concat('-').concat(totalShots.toString())]);
  let shot = ensureShot(event.params._game.toString().concat('-').concat(totalShots.toString()));
  game.totalShots = totalShots;
  shot.game = gameId;
  shot.turn = totalShots;
  shot.x = BigInt.fromI32(event.params._x);
  shot.y = BigInt.fromI32(event.params._y);
  shot.save();
  game.save();
}

export function handleGameWon(event: Won): void {
  log.warning('Game won ID {}: ', [event.params._nonce.toString()]);
  let game = ensureBattleShipGame(event.params._nonce.toString());
  game.status = 'OVER';
  game.winner = event.params._winner;
  game.save();
}
