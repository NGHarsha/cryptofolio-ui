import { AppActions } from '../actions';
import { START_LOADING, STOP_LOADING } from '../actions/ui.actions';

export interface State {
  isLoading: boolean;
}

const initialState: State = {
  isLoading: false,
};

export function uiReducer(state = initialState, action: AppActions) {
  switch (action.type) {
    case START_LOADING:
      return { isLoading: true };
    case STOP_LOADING:
      return { isLoading: false };
    default:
      return state;
  }
}

export const getIsLoading = (state: State) => state.isLoading;
