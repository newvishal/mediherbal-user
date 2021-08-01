import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subject } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import * as fromApp from '../../../store/app.reducer';
@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  constructor(
    private store: Store<fromApp.AppState>,
    private angularfireStore: AngularFirestore,
    private http: HttpClient
  ) {}
  userCart = new BehaviorSubject(null);
  getUsersAddress() {
    return this.http.get<{ status: boolean; message: string; data: any }>(
      `${environment.base_url}user/address/fetch-address`
    );
  }
  setUserCart(cart) {
    this.userCart.next(cart);
  }
  getUserData() {
    return this.store.select('AuthSection');
  }
  placeOrder(data) {
    return this.http.post<{ status: boolean; message: string; data: any }>(
      `${environment.base_url}order`,
      data
    );
  }
}
