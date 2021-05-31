export interface cartState {
  cart: any[];
  cartLoading: boolean;
}
const initalState: cartState = {
  cart: [],
  cartLoading: false,
};
export function CartReducer(state: cartState = initalState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
