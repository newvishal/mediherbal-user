import { ActionReducerMap } from '@ngrx/store';
import * as fromAuthReducer from '../auth/store/Auth.reducer';

export interface AppState {
  AuthSection: fromAuthReducer.AuthSate;
}
export const AppReducer: ActionReducerMap<AppState> = {
  AuthSection: fromAuthReducer.AuthReducer,
};
