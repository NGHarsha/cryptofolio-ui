import {
  Action,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromUi from './shared/state-management/reducers/ui.reducer';
import * as fromCoin from './shared/state-management/reducers/coin.reducer';
import * as fromPortfolio from './shared/state-management/reducers/portfolio.reducer';
import * as fromNews from './shared/state-management/reducers/news.reducer';
import { AppActions } from './shared/state-management/actions';

export interface State {
  ui: fromUi.State;
  coinReducer: fromCoin.State;
  portfolioReducer: fromPortfolio.State;
  newsReducer: fromNews.State;
}

export const reducers: ActionReducerMap<State, AppActions> = {
  ui: fromUi.uiReducer,
  coinReducer: fromCoin.coinReducer,
  portfolioReducer: fromPortfolio.portfolioReducer,
  newsReducer: fromNews.newsReducer,
};

export const getUiState = createFeatureSelector<fromUi.State>('ui');
export const getIsLoading = createSelector(getUiState, fromUi.getIsLoading);

export const getCoinState =
  createFeatureSelector<fromCoin.State>('coinReducer');
export const getCoins = createSelector(getCoinState, fromCoin.getCoins);

export const getPortfolioReducer =
  createFeatureSelector<fromPortfolio.State>('portfolioReducer');

export const getPortfolios = createSelector(
  getPortfolioReducer,
  fromPortfolio.getPortfolios
);
export const getSelectedPortfolio = createSelector(
  getPortfolioReducer,
  fromPortfolio.getSelectedPortfolio
);
export const getLoaded = createSelector(
  getPortfolioReducer,
  fromPortfolio.getLoaded
);
export const getStatistics = createSelector(
  getPortfolioReducer,
  fromPortfolio.getStatistics
);

export const getNews = createFeatureSelector<fromNews.State>('newsReducer');
