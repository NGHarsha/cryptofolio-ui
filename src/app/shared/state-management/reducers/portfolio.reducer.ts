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
  UPDATE_STATISTICS,
} from '../actions/portfolio.actions';

export interface State {
  portfolios: Portfolio[];
  selectedPortfolio: null | Portfolio;
  statistics: null | Portfolio;
  loading: boolean;
  loaded: boolean;
}

const initialState: State = {
  portfolios: [],
  selectedPortfolio: null,
  statistics: null,
  loaded: false,
  loading: false,
};

export function portfolioReducer(state = initialState, action: AppActions) {
  switch (action.type) {
    case CHANGE_SELECTED_PORTFOLIO:
      //console.log(action.payload);
      return {
        ...state,
        selectedPortfolio: action.payload,
      };
    case FETCH_PORTFOLIOS:
      //console.log('FETCH ACTION');
      return {
        ...state,
        loading: true,
      };
    case FETCH_PORTFOLIOS_SUCCESS:
      //console.log(action.payload);
      return {
        ...state,
        loading: false,
        loaded: true,
        portfolios: action.payload.portfolios,
      };
    case FETCH_PORTFOLIOS_FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
        portfolios: action.payload,
      };
    case POPULATE_PORTFOLIO:
      //console.log('Populate', action.payload);
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    case POPULATE_PORTFOLIO_SUCCESS:
      //console.log(action.payload);
      return {
        ...state,
        loading: false,
        loaded: true,
        selectedPortfolio: action.payload.portfolio,
      };
    case POPULATE_PORTFOLIO_FAILURE:
      //console.log(action.payload);
      return {
        ...state,
        loading: false,
        loaded: true,
      };

    case UPDATE_STATISTICS:
      if (action.payload.level === 'portfolio') {
        return {
          ...state,
          statistics: action.payload.data,
        };
      } else {
        let trans = state.statistics?.transactions.map((c) => {
          if (c.symbol === action.payload.data.symbol) {
            return {
              ...c,
              current_price: action.payload.data.current_price,
              pandl: action.payload.data.pandl,
              price_change_percentage_24h:
                action.payload.data.price_change_percentage_24h,
              value: action.payload.data.value,
            };
          }
          return c;
        });
        let bal = 0;
        trans?.forEach((t) => {
          bal += t.value;
        });
        return {
          ...state,
          statistics: {
            ...state.statistics,
            balance: bal,
            transactions: trans,
          },
        };
      }

    default:
      return state;
  }
}

export const getSelectedPortfolio = (state: State) => state.selectedPortfolio;
export const getPortfolios = (state: State) => state.portfolios;
export const getStatistics = (state: State) => state.statistics;
export const getLoaded = (state: State) => state.loaded;
