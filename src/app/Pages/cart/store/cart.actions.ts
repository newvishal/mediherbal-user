/*
Cart Actions
*/

import { Action } from '@ngrx/store';
import { FETCH_PRODUCT_SUCCESS } from '../../home/store/home.action';

export const FETCH_CART_START = 'FETCH_CART_START';
export const FETCH_CART_SUCCESS = 'FETCH_CART_SUCCESS';

/* Cart Action Type Defination */
export type CartActionTYpes = any;

/*
Cart Action Classes
*/
export class FetchCartStart implements Action {
  readonly type = FETCH_CART_START;
}
export class FetchCartSuccess implements Action {
  readonly type = FETCH_PRODUCT_SUCCESS;
  constructor(public payload: any[]) {}
}
