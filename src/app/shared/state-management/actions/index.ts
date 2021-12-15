import * as UiActions from './ui.actions';
import * as CoinActions from './coin.actions';
import * as PortfolioActions from './portfolio.actions';
import * as NewsActions from './news.actions';

export type AppActions =
  | UiActions.UIActions
  | CoinActions.CoinActions
  | PortfolioActions.PortfolioActions
  | NewsActions.NewsActions;
