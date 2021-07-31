import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, pluck, switchMap, take, tap } from 'rxjs/operators';
import * as fromCartAction from '../store/cart.actions';
import * as fromApp from '../../../store/app.reducer';
import { of } from 'rxjs';

@Injectable()
export class CartEffects {
  constructor(
    private action$: Actions,
    private angularFireStore: AngularFirestore,
    private store: Store<fromApp.AppState>
  ) {}
  @Effect({ dispatch: true })
  fetchCart = this.action$.pipe(
    ofType(fromCartAction.FETCH_CART_START),
    switchMap((cartSartState: any) => {
      return this.store.select('AuthSection').pipe(
        pluck('user'),
        pluck('cart'),
        map((userCart) => {
          let updatedCartDetails: any[] = [];
          if (userCart) {
            userCart.map((cartitem) => {
              if (cartitem.product_type === 'products') {
                this.angularFireStore
                  .collection('products')
                  .doc(cartitem.product_id)
                  .snapshotChanges()
                  .pipe(
                    take(1),
                    map((product) => {
                      let returnData;
                      const data = product.payload.data() as any;
                      const id = product.payload.id;
                      return (returnData = {
                        product_data: { ...data },
                        cartData: { ...cartitem },
                        product_id: id,
                      });
                    }),
                    tap((cartDetails) => {
                      updatedCartDetails.push({
                        ...cartDetails.cartData,
                        ...cartDetails.product_data,
                        product_id: cartDetails.product_id,
                      });
                    })
                  )
                  .subscribe();
              }
            });
          }
          return updatedCartDetails;
        })
      );
    }),
    map((cartdeatils) => {
      return new fromCartAction.FetchCartSuccess(cartdeatils);
    })
  );
}
