import {
  ComboProductInterface,
  products,
} from '../../Interface/combo-products.interface';
import * as fromHomeActions from './home.action';
export interface HomeStateInterface {
  products: products[];
  comboProduct: ComboProductInterface[];
  productLoading: boolean;
  comboLoading: boolean;
}
const initialState: HomeStateInterface = {
  comboLoading: false,
  comboProduct: [],
  productLoading: false,
  products: [],
};

export function HomeReducer(
  state: HomeStateInterface = initialState,
  action: fromHomeActions.HomeActionType
) {
  switch (action.type) {
    case fromHomeActions.FETCH_PRODUCT_START:
      return { ...state, productLoading: true };
    case fromHomeActions.FETCH_PRODUCT_SUCCESS:
      return { ...state, products: action.payload, productLoading: false };
    case fromHomeActions.FETCH_COMBO_PRODUCT_START:
      return { ...state, comboLoading: true };
    case fromHomeActions.FETCH_COMBO_PRODUCT_SUCCESS:
      return { ...state, comboLoading: false, comboProduct: action.payload };
    default:
      return state;
  }
}
