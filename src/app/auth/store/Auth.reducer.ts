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
  user: null,
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
    default:
      return state;
  }
}
