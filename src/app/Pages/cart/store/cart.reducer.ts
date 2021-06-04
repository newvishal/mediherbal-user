import * as fromCartActions from './cart.actions';
export interface cartState {
  cart: any[];
  cartLoading: boolean;
}
const initalState: cartState = {
  cart: [],
  cartLoading: false,
};
export function CartReducer(
  state: cartState = initalState,
  action: fromCartActions.CartActionTypes
) {
  switch (action.type) {
    case fromCartActions.FETCH_CART_SUCCESS:return{...state,cart:action.payload}
    default:
      return state;
  }
}
