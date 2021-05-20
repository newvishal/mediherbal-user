import { Action } from '@ngrx/store';
import {
  ComboProductInterface,
  products,
} from '../../Interface/combo-products.interface';
import { ProductInterface } from '../../Interface/product.interface';

/* Action  Types */
export const FETCH_PRODUCT_START = '[HOME SECTION]FETCH_PRODUCT_START';
export const FETCH_PRODUCT_SUCCESS = '[HOME SECTION]FETCH_PRODUCT_SUCCESS';
export const FETCH_COMBO_PRODUCT_START =
  '[HOME SECTION]FETCH_COMBO_PRODUCT_START';
export const FETCH_COMBO_PRODUCT_SUCCESS =
  '[HOME SECTION]FETCH_COMBO_PRODUCT_SUCCESS';

/* Action Types Classes */
export class FetchProductStart implements Action {
  readonly type = FETCH_PRODUCT_START;
  constructor() {}
}
export class FetchProductSuccess implements Action {
  readonly type = FETCH_PRODUCT_SUCCESS;
  constructor(public payload: products[]) {}
}
export class FetchComboProductStart {
  readonly type = FETCH_COMBO_PRODUCT_START;
  constructor() {}
}
export class FetchComboProductSuccess {
  readonly type = FETCH_COMBO_PRODUCT_SUCCESS;
  constructor(public payload: ComboProductInterface[]) {}
}

/* Action  Type */

export type HomeActionType =
  | FetchProductStart
  | FetchProductSuccess
  | FetchComboProductStart
  | FetchComboProductSuccess;
