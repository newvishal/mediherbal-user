import { Injectable } from '@angular/core';
import { User } from '../interface/user.interface';
import * as fromAuthAction from '../store/Auth.Actions';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private store: Store<fromApp.AppState>) {}
  userSingup(UserData: User) {
    const finalData: User = {
      ...UserData,
      cart: [],
      number_of_times_order_Places: 0,
      userType: 'User',
    };
    this.store.dispatch(new fromAuthAction.SignUpStart(finalData));
  }
  userLogin(loginData: { email: string; passwortd: string }) {
    this.store.dispatch(
      new fromAuthAction.LoginStart({
        email: loginData.email,
        password: loginData.passwortd,
      })
    );
  }
  userForgotPassword(email) {
    this.store.dispatch(new fromAuthAction.ForgotPasswordStart(email));
  }
}
