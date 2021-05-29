import { Action } from 'rxjs/internal/scheduler/Action';
import * as fromAuthAction from './Auth.Actions';
export interface AuthSate {
  user: any;
  loginLoading: boolean;
  forgotPasswordLoading: boolean;
  signupLoading: boolean;
  /*
  errors
  */
  loginError: string;
  SignUpError: string;
  ForgotPasswordError: string;
}
const initialState: AuthSate = {
  user: {},
  loginLoading: false,
  signupLoading: false,
  forgotPasswordLoading: false,
  loginError: null,
  SignUpError: null,
  ForgotPasswordError: null,
};
export function AuthReducer(
  state: AuthSate = initialState,
  action: fromAuthAction.AuthActionType
) {
  switch (action.type) {
    case fromAuthAction.LOGIN_START:
      return { ...state, loginLoading: true };
    case fromAuthAction.LOGIN_SUCCESS:
      const logedINUser = { ...action.payload };
      return {
        ...state,
        user: logedINUser,
        loginLoading: false,
      };
    case fromAuthAction.SIGNUP_START:
      return { ...state, signupLoading: true };
    case fromAuthAction.SIGNUP_SUCCESS:
      return { ...state, signupLoading: false };
    case fromAuthAction.FORGOT_PASSWORD_START:
      return { ...state, forgotPasswordLoading: true };
    case fromAuthAction.FORGOT_PASSWORD_SUCCESS:
      return { ...state, forgotPasswordLoading: false };
    case fromAuthAction.CHANGE_USER_CART_DETAILS_SUCCESS:
      const UpdatedCartDeatils = { ...action.playload };
      return { ...state, user: UpdatedCartDeatils };
    default:
      return state;
  }
}
