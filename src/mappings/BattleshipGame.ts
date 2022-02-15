import { Joined, Started, Shot, Won, Collected } from '../../generated/BattleshipGame/BattleshipGame';
import { BIG_INT_ONE } from '../constants';
import { ensureBattleShipGame } from '../entities/Currency';
import { ensureShot } from '../entities/Shot';
import { log } from '@graphprotocol/graph-ts';

export function handleGameStarted(event: Started): void {
    let game = ensureBattleShipGame(event.params._nonce.toString());
    game.save();
}

export function handleGameJoined(event: Joined): void {
    let game = ensureBattleShipGame(event.params._nonce.toString());
    game.status = 'JOINED';
    game.save();
}

export function handleShot(event: Shot): void {
    let shot = ensureShot(event.params._game.toString().concat('-').concat(event.params._turn.toString()));
    let game = ensureBattleShipGame(event.params._game.toString());
    shot.game = game.id;
    shot.hit = event.params._hit;
    shot.turn = event.params._turn;
    game.totalShots = game.totalShots.plus(BIG_INT_ONE);
    shot.save();
    game.save();
}

export function handleGameWon(event: Won): void {
    let game = ensureBattleShipGame(event.params._nonce.toString());
    game.status = 'OVER';
    game.winner = event.params._winner;
    game.save();
}

export function handleRewardCollected(event: Collected): void { }
