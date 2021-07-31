import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subject } from 'rxjs';
import { pluck } from 'rxjs/operators';
import * as fromApp from '../../../store/app.reducer';
@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  constructor(
    private store: Store<fromApp.AppState>,
    private angularfireStore: AngularFirestore
  ) {}
  userCart = new BehaviorSubject(null);
  getUsersAddress() {
    return this.store
      .select('AuthSection')
      .pipe(pluck('user'), pluck('address'));
  }
  setUserCart(cart) {
    this.userCart.next(cart);
  }
  getUserData() {
    return this.store.select('AuthSection');
  }
  placeOrder(data) {
    this.angularfireStore.collection('orders').add(data);
  }
}
