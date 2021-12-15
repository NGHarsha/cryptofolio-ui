import { Action } from '@ngrx/store';
import { Coin } from '../../models/Coin';
import { AppActions } from '../actions';
import {
  CoinActions,
  FETCH_COINS,
  FETCH_COINS_FAILURE,
  FETCH_COINS_SUCCESS,
} from '../actions/coin.actions';

export interface State {
  coins: Coin[];
  loading: boolean;
  loaded: boolean;
}

const initialState: State = {
  coins: [],
  loaded: false,
  loading: false,
};

export function coinReducer(state = initialState, action: AppActions) {
  switch (action.type) {
    case FETCH_COINS:
      return {
        ...state,
        loading: true,
      };
    case FETCH_COINS_SUCCESS:
      console.log(action.payload);
      return {
        loading: false,
        loaded: true,
        coins: action.payload,
      };
    case FETCH_COINS_FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    default:
      return state;
  }
}

export const getCoins = (state: State) => state.coins;
