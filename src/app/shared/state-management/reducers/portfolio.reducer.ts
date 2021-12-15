import { Coin } from '../../models/Coin';
import { Portfolio } from '../../models/Portfolio';
import { AppActions } from '../actions';
import {
  CHANGE_SELECTED_PORTFOLIO,
  FETCH_PORTFOLIOS,
  FETCH_PORTFOLIOS_FAILURE,
  FETCH_PORTFOLIOS_SUCCESS,
  POPULATE_PORTFOLIO,
  POPULATE_PORTFOLIO_FAILURE,
  POPULATE_PORTFOLIO_SUCCESS,
  PortfolioActions,
} from '../actions/portfolio.actions';

export interface State {
  portfolios: Portfolio[];
  selectedPortfolio: null | Portfolio;
  loading: boolean;
  loaded: boolean;
}

const initialState: State = {
  portfolios: [],
  selectedPortfolio: null,
  loaded: false,
  loading: false,
};

export function portfolioReducer(state = initialState, action: AppActions) {
  switch (action.type) {
    case CHANGE_SELECTED_PORTFOLIO:
      console.log(action.payload);
      return {
        ...state,
        selectedPortfolio: action.payload,
      };
    case FETCH_PORTFOLIOS:
      console.log('FETCH ACTION');
      return {
        ...state,
        loading: true,
      };
    case FETCH_PORTFOLIOS_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        loading: false,
        loaded: true,
        portfolios: action.payload.portfolios,
        selectedPortfolio: action.payload.selectedPortfolio,
      };
    case FETCH_PORTFOLIOS_FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
        portfolios: action.payload,
      };
    case POPULATE_PORTFOLIO:
      console.log('Populate');
      return {
        ...state,
        loading: true,
      };
    case POPULATE_PORTFOLIO_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        loading: false,
        loaded: true,
        portfolios: state.portfolios
          .map((portfolio) => ({ ...portfolio }))
          .map((portfolio) => {
            if (portfolio.id === action.payload.pid) {
              return {
                ...portfolio,
                transactions: action.payload.transactions,
              };
            } else {
              return portfolio;
            }
          }),
      };
    case POPULATE_PORTFOLIO_FAILURE:
      console.log(action.payload);
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
}

export const getSelectedPortfolio = (state: State) => state.selectedPortfolio;
