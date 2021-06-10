import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subject } from 'rxjs';
import { pluck } from 'rxjs/operators';
import * as fromApp from '../../../store/app.reducer';
@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  constructor(private store: Store<fromApp.AppState>) {}
  userCart = new BehaviorSubject(null);
  getUsersAddress() {
    return this.store
      .select('AuthSection')
      .pipe(pluck('user'), pluck('address'));
  }
  setUserCart(cart) {
    this.userCart.next(cart);
  }
}
