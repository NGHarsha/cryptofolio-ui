import { Action } from '@ngrx/store';
import { Coin } from '../../models/Coin';

export const FETCH_COINS = '[Coin] Fetch Coins';
export const FETCH_COINS_SUCCESS = '[Coin] Fetch Coins Success';
export const FETCH_COINS_FAILURE = '[Coin] Fetch Coins Failure';
export const UPDATE_COIN = '[Coin] Update Coin';

export class FetchCoins implements Action {
  readonly type = FETCH_COINS;
}

export class FetchCoinsSuccess implements Action {
  readonly type = FETCH_COINS_SUCCESS;
  constructor(public payload: Coin[]) {}
}

export class FetchCoinsFailure implements Action {
  readonly type = FETCH_COINS_FAILURE;
}

export class UpdateCoin implements Action {
  readonly type = UPDATE_COIN;
  constructor(public payload: Coin) {}
}

export type CoinActions =
  | FetchCoins
  | FetchCoinsSuccess
  | FetchCoinsFailure
  | UpdateCoin;
