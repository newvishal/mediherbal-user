import { ActionReducerMap } from '@ngrx/store';
import * as fromAuthReducer from '../auth/store/Auth.reducer';
import * as fromHomeReducer from '../Pages/home/store/home.reducer';

export interface AppState {
  AuthSection: fromAuthReducer.AuthSate;
  HomeSection: fromHomeReducer.HomeStateInterface;
}
export const AppReducer: ActionReducerMap<AppState> = {
  AuthSection: fromAuthReducer.AuthReducer,
  HomeSection: fromHomeReducer.HomeReducer,
};
