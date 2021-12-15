import { News } from '../../models/News';
import { AppActions } from '../actions';

import {
  FETCH_PORTFOLIO_NEWS,
  FETCH_PORTFOLIO_NEWS_FAILURE,
  FETCH_PORTFOLIO_NEWS_SUCCESS,
} from '../actions/news.actions';

export interface State {
  news: News[];
  loading: boolean;
  loaded: boolean;
}

const initialState: State = {
  news: [],
  loaded: false,
  loading: false,
};

export function newsReducer(state = initialState, action: AppActions) {
  switch (action.type) {
    case FETCH_PORTFOLIO_NEWS:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PORTFOLIO_NEWS_SUCCESS:
      console.log(action.payload);
      return {
        loading: false,
        loaded: true,
        news: action.payload,
      };
    case FETCH_PORTFOLIO_NEWS_FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    default:
      return state;
  }
}

export const getNews = (state: State) => state.news;
