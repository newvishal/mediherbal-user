import { Action } from '@ngrx/store';
import { User } from '../interface/user.interface';

/*
Auth Action Type

*/
export const SIGNUP_START = '[AUTH SECTION] SIGNUP_START';
export const SIGNUP_SUCCESS = '[AUTH SECTION] SIGNUP_SUCCESS';
export const SIGNUP_FAIL = '[AUTH SECTION] SIGNUP_Fail';
export const LOGIN_START = '[AUTH SECTION] LOGIN_START';
export const LOGIN_SUCCESS = '[AUTH SECTION] LOGIN_SUCCESS';
export const LOGIN_FAIL = '[AUTH SECTION] LOGIN_FAIL';
export const FORGOT_PASSWORD_START = '[AUTH SECTION] FORGOT_PASSWORD_START';
export const FORGOT_PASSWORD_SUCCESS = '[AUTH SECTION] FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAIL = '[AUTH SECTION] FORGOT_PASSWORD_FAIL';
export const CHANGE_USER_CART_DETAILS_START =
  '[AUTH SECTION] CHANGE_USER_CART_DETAILS_START';
export const CHANGE_USER_CART_DETAILS_SUCCESS =
  '[AUTH SECTION] CHANGE_USER_CART_DETAILS_SUCCESS';
/*

 AuthAction Type
 */
export type AuthActionType =
  | SignUpStart
  | SignUpSuccess
  | SignUpFailed
  | LoginStart
  | LoginSuccess
  | LoginFail
  | ForgotPasswordStart
  | ForgotPasswordSuccess
  | ForgotPasswordFailed
  | ChangeUserCartDeatilsStart
  | ChangeUserCartDeatilsSuccess;

/*
Auth Action Classes
*/
export class SignUpStart implements Action {
  readonly type = SIGNUP_START;
  constructor(public payload: User) {}
}

export class SignUpSuccess implements Action {
  readonly type = SIGNUP_SUCCESS;
}
export class SignUpFailed implements Action {
  readonly type = SIGNUP_FAIL;
  constructor(public payload: string) {}
}
export class LoginStart implements Action {
  readonly type = LOGIN_START;
  constructor(public payload: { email: string; password: string }) {}
}

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;
  constructor(public payload: User) {}
}
export class LoginFail implements Action {
  readonly type = LOGIN_FAIL;
  constructor(public payload: string) {}
}
export class ForgotPasswordStart implements Action {
  readonly type = FORGOT_PASSWORD_START;
  constructor(public payload: string) {}
}
export class ForgotPasswordSuccess implements Action {
  readonly type = FORGOT_PASSWORD_SUCCESS;
}
export class ForgotPasswordFailed implements Action {
  readonly type = FORGOT_PASSWORD_FAIL;
  constructor(public payload: string) {}
}

/* Cart Action Class */
export class ChangeUserCartDeatilsStart implements Action {
  readonly type = CHANGE_USER_CART_DETAILS_START;
  constructor(public playload: User) {}
}
export class ChangeUserCartDeatilsSuccess implements Action {
  readonly type = CHANGE_USER_CART_DETAILS_SUCCESS;
  constructor(public playload: User) {}
}
