import { Action } from '@ngrx/store';
import { News } from '../../models/News';

export const FETCH_PORTFOLIO_NEWS = '[News] Fetch News';
export const FETCH_PORTFOLIO_NEWS_SUCCESS = '[News] Fetch News Success';
export const FETCH_PORTFOLIO_NEWS_FAILURE = '[News] Fetch News Failure';

export class FetchPortfolioNews implements Action {
  readonly type = FETCH_PORTFOLIO_NEWS;
}

export class FetchPortfolioNewsSuccess implements Action {
  readonly type = FETCH_PORTFOLIO_NEWS_SUCCESS;
  constructor(public payload: News[]) {}
}

export class FetchPortfolioNewsFailure implements Action {
  readonly type = FETCH_PORTFOLIO_NEWS_FAILURE;
}

export type NewsActions =
  | FetchPortfolioNews
  | FetchPortfolioNewsSuccess
  | FetchPortfolioNewsFailure;
