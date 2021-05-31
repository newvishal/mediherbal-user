import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, pluck, switchMap, tap } from 'rxjs/operators';
import * as fromCartAction from '../store/cart.actions';
import * as fromApp from '../../../store/app.reducer';

@Injectable()
export class CartEffects {
  constructor(
    private action$: Actions,
    private angularFireStore: AngularFirestore,
    private store: Store<fromApp.AppState>
  ) {}
  @Effect({ dispatch: false })
  fetchCart = this.action$.pipe(
    ofType(fromCartAction.FETCH_CART_START),
    switchMap((cartSartState: any) => {
      return this.store.select('AuthSection').pipe(
        pluck('user'),
        map((userData) => userData.cart),
        tap((userCart) => {
          console.log(userCart);
        /*   userCart.map((cartItems) => {
            this.angularFireStore
              .collection(cartItems.product_type)
              .doc(cartItems.product_id)
              .get()
              .subscribe();
          }); */
        })
      );

      return [];
    })
  );
}
