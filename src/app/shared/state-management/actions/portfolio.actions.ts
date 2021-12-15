import { Action } from '@ngrx/store';

export const FETCH_PORTFOLIOS = '[Portfolio] Fetch Portfolios';
export const FETCH_PORTFOLIOS_SUCCESS = '[Portfolio] Fetch Portfolio Success';
export const FETCH_PORTFOLIOS_FAILURE = '[Portfolio] Fetch Portfolios Failure';
export const POPULATE_PORTFOLIO = '[Portfolio] Populate Portfolio';
export const POPULATE_PORTFOLIO_SUCCESS =
  '[Portfolio] Populate Portfolio Success';
export const POPULATE_PORTFOLIO_FAILURE =
  '[Portfolio] Populate Portfolio Failure';

export const CHANGE_SELECTED_PORTFOLIO =
  '[Portfolio] Change Selected Portfolio';

export class fetchPortfolios implements Action {
  readonly type = FETCH_PORTFOLIOS;
}

export class fetchPortfoliosSuccess implements Action {
  readonly type = FETCH_PORTFOLIOS_SUCCESS;
  constructor(public payload: any) {}
}

export class fetchPortfoliosFailure implements Action {
  readonly type = FETCH_PORTFOLIOS_FAILURE;
  constructor(public payload: any) {}
}

export class populatePortfolio implements Action {
  readonly type = POPULATE_PORTFOLIO;
  constructor(public payload: any) {}
}

export class populatePortfolioSuccess implements Action {
  readonly type = POPULATE_PORTFOLIO_SUCCESS;
  constructor(public payload: any) {}
}

export class populatePortfolioFailure implements Action {
  readonly type = POPULATE_PORTFOLIO_FAILURE;
  constructor(public payload: any) {}
}

export class changeSelectedPortfolio implements Action {
  readonly type = CHANGE_SELECTED_PORTFOLIO;
  constructor(public payload: any) {}
}

export type PortfolioActions =
  | fetchPortfolios
  | fetchPortfoliosSuccess
  | fetchPortfoliosFailure
  | populatePortfolio
  | populatePortfolioSuccess
  | populatePortfolioFailure
  | changeSelectedPortfolio;
