import { ActionReducerMap } from '@ngrx/store';
import * as fromAuthReducer from '../auth/store/Auth.reducer';
import * as fromHomeReducer from '../Pages/home/store/home.reducer';
import * as fromCartReducer from '../Pages/cart/store/cart.reducer';

export interface AppState {
  AuthSection: fromAuthReducer.AuthSate;
  HomeSection: fromHomeReducer.HomeStateInterface;
  cart: fromCartReducer.cartState;
}
export const AppReducer: ActionReducerMap<AppState> = {
  AuthSection: fromAuthReducer.AuthReducer,
  HomeSection: fromHomeReducer.HomeReducer,
  cart: fromCartReducer.CartReducer,
};
